/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Typography from '@mui/material/Typography';
import React, { useCallback, useMemo } from 'react';
import { useLingui } from '@lingui/react/macro';
import { requestManager } from '@/lib/requests/RequestManager.ts';
import { LoadingPlaceholder } from '@/base/components/feedback/LoadingPlaceholder.tsx';
import { EmptyViewAbsoluteCentered } from '@/base/components/feedback/EmptyViewAbsoluteCentered.tsx';
import { StyledGroupedVirtuoso } from '@/base/components/virtuoso/StyledGroupedVirtuoso.tsx';
import { StyledGroupHeader } from '@/base/components/virtuoso/StyledGroupHeader.tsx';
import { StyledGroupItemWrapper } from '@/base/components/virtuoso/StyledGroupItemWrapper.tsx';
import { defaultPromiseErrorHandler } from '@/lib/DefaultPromiseErrorHandler.ts';
import { VirtuosoUtil } from '@/lib/virtuoso/Virtuoso.util.tsx';
import { getErrorMessage } from '@/lib/HelperFunctions.ts';
import { GroupedChapterHistoryCard } from '@/features/history/components/GroupedChapterHistoryCard.tsx';
import { Chapters } from '@/features/chapter/services/Chapters.ts';
import { useAppTitle } from '@/features/navigation-bar/hooks/useAppTitle.ts';
import { STABLE_EMPTY_ARRAY } from '@/base/Base.constants.ts';
import type { GetChaptersHistoryQuery } from '@/lib/graphql/generated/graphql.ts';

type HistoryNode = NonNullable<GetChaptersHistoryQuery['chapters']['nodes']>[number];

export const History: React.FC = () => {
    const { t } = useLingui();

    useAppTitle(t`History`);

    const {
        data: chapterHistoryData,
        loading: isLoading,
        error,
        fetchMore,
        refetch,
    } = requestManager.useGetRecentlyReadChapters(undefined, {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    });
    const hasNextPage = !!chapterHistoryData?.chapters.pageInfo.hasNextPage;
    const readEntries = chapterHistoryData?.chapters.nodes ?? STABLE_EMPTY_ARRAY;

    const groupedByDate = useMemo(() => {
        if (!readEntries || readEntries.length === 0) {return STABLE_EMPTY_ARRAY;}

        const dateGroups = Chapters.groupByDate(readEntries as HistoryNode[], 'lastReadAt');

        return Object.entries(dateGroups)
            .map(([date, chapters]) => {
                const mangaGroups: Record<number, HistoryNode[]> = {};

                chapters.forEach((node) => {
                    const { id } = node.manga;
                    if (!mangaGroups[id]) {
                        mangaGroups[id] = [];
                    }
                    mangaGroups[id].push(node);
                });

                return {
                    date,
                    mangaEntries: Object.values(mangaGroups).filter((m) => m.length > 0),
                };
            })
            .filter((group) => group.mangaEntries.length > 0);
    }, [readEntries]);

    const groupCounts: number[] = useMemo(
        () => groupedByDate.map((group) => group.mangaEntries.length),
        [groupedByDate],
    );

    const computeItemKey = VirtuosoUtil.useCreateGroupedComputeItemKey(
        groupCounts,
        useCallback((groupIndex) => groupedByDate[groupIndex]?.date ?? `header-${groupIndex}`, [groupedByDate]),
        useCallback(
            (index, groupIndex) => {
                const group = groupedByDate[groupIndex];
                const entry = group?.mangaEntries[index];
                const mangaId = entry?.[0]?.manga?.id;
                return mangaId ? `${group.date}-${mangaId}` : `loading-${groupIndex}-${index}`;
            },
            [groupedByDate],
        ),
    );

    const loadMore = useCallback(() => {
        if (isLoading || !hasNextPage) {return;}

        fetchMore({
            variables: {
                offset: readEntries.length,
                first: 50,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {return prev;}
                return {
                    __typename: 'Query',
                    chapters: {
                        ...fetchMoreResult.chapters,
                        nodes: [...(prev.chapters.nodes ?? []), ...(fetchMoreResult.chapters.nodes ?? [])],
                    },
                };
            },
        }).catch(defaultPromiseErrorHandler('History::loadMore'));
    }, [hasNextPage, isLoading, readEntries.length, fetchMore]);

    if (error && !chapterHistoryData) {
        return (
            <EmptyViewAbsoluteCentered
                message={t`Unable to load data`}
                messageExtra={getErrorMessage(error)}
                retry={() => refetch().catch(defaultPromiseErrorHandler('History::refetch'))}
            />
        );
    }

    if (!isLoading && readEntries.length === 0) {
        return <EmptyViewAbsoluteCentered message={t`You have not read any series yet.`} />;
    }

    return (
        <StyledGroupedVirtuoso
            useWindowScroll
            persistKey="history"
            components={{
                Footer: () => (isLoading ? <LoadingPlaceholder usePadding /> : null),
            }}
            overscan={window.innerHeight}
            endReached={loadMore}
            groupCounts={groupCounts}
            groupContent={(index) => (
                <StyledGroupHeader isFirstItem={index === 0}>
                    <Typography variant="h5" component="h2">
                        {groupedByDate[index]?.date}
                    </Typography>
                </StyledGroupHeader>
            )}
            computeItemKey={computeItemKey}
            itemContent={(index, groupIndex) => {
                const group = groupedByDate[groupIndex];
                if (!group) {return <div style={{ height: '92px' }} />;}

                const mangaEntries = group.mangaEntries[index];
                if (!mangaEntries) {
                    return <div style={{ height: '92px' }} />;
                }

                return (
                    <StyledGroupItemWrapper sx={{ minHeight: '92px', display: 'block' }}>
                        <GroupedChapterHistoryCard chapters={mangaEntries} />
                    </StyledGroupItemWrapper>
                );
            }}
        />
    );
};
