/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Typography from '@mui/material/Typography';
import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLingui } from '@lingui/react/macro';
import IconButton from '@mui/material/IconButton';
import { requestManager } from '@/lib/requests/RequestManager.ts';
import { LoadingPlaceholder } from '@/base/components/feedback/LoadingPlaceholder.tsx';
import { EmptyViewAbsoluteCentered } from '@/base/components/feedback/EmptyViewAbsoluteCentered.tsx';
import { UpdateChecker } from '@/features/updates/components/UpdateChecker.tsx';
import { StyledGroupedVirtuoso } from '@/base/components/virtuoso/StyledGroupedVirtuoso.tsx';
import { StyledGroupHeader } from '@/base/components/virtuoso/StyledGroupHeader.tsx';
import { StyledGroupItemWrapper } from '@/base/components/virtuoso/StyledGroupItemWrapper.tsx';
import { dateTimeFormatter } from '@/base/utils/DateHelper.ts';
import { defaultPromiseErrorHandler } from '@/lib/DefaultPromiseErrorHandler.ts';
import { VirtuosoUtil } from '@/lib/virtuoso/Virtuoso.util.tsx';
import { getErrorMessage } from '@/lib/HelperFunctions.ts';
import { GroupedChapterUpdateCard } from '@/features/updates/components/GroupedChapterUpdateCard.tsx';
import { Chapters } from '@/features/chapter/services/Chapters.ts';
import { useAppTitleAndAction } from '@/features/navigation-bar/hooks/useAppTitleAndAction.ts';
import { CustomTooltip } from '@/base/components/CustomTooltip.tsx';
import { STABLE_EMPTY_ARRAY } from '@/base/Base.constants.ts';

export const Updates: React.FC = () => {
    const { t } = useLingui();

    const {
        data: chapterUpdateData,
        loading: isLoading,
        error,
        fetchMore,
        refetch,
    } = requestManager.useGetRecentlyUpdatedChapters(undefined, {
        fetchPolicy: 'cache-and-network',
    });
    const hasNextPage = !!chapterUpdateData?.chapters.pageInfo.hasNextPage;
    const updateEntries = chapterUpdateData?.chapters.nodes ?? STABLE_EMPTY_ARRAY;
    const updateGroups = useMemo(() => {
        const byDate = Chapters.groupByDate(updateEntries, 'fetchedAt');

        return Object.entries(byDate).map(([date, chapters]) => {
            const mangaMap = new Map<number, { manga: any; chapters: any[]; fetchedAt: string }>();

            (chapters as any[]).forEach((entry) => {
                const mangaId = entry.manga.id;
                if (!mangaMap.has(mangaId)) {
                    mangaMap.set(mangaId, {
                        manga: entry.manga,
                        chapters: [],
                        fetchedAt: entry.fetchedAt,
                    });
                }
                mangaMap.get(mangaId)!.chapters.push(entry);
            });

            return {
                date,
                mangaGroups: Array.from(mangaMap.values()),
            };
        });
    }, [updateEntries]);
    const groupCounts = useMemo(() => updateGroups.map((group) => group.mangaGroups.length), [updateGroups]);
    const flatMangaEntries = useMemo(() => updateGroups.flatMap((g) => g.mangaGroups), [updateGroups]);

    const computeItemKey = VirtuosoUtil.useCreateGroupedComputeItemKey(
        groupCounts,
        useCallback((index) => updateGroups[index].date, [updateGroups]),
        useCallback(
            (index) => `${flatMangaEntries[index].manga.id}-${flatMangaEntries[index].fetchedAt}-${index}`,
            [flatMangaEntries],
        ),
    );

    const lastUpdateTimestampCompRef = useRef<HTMLElement>(null);
    const [lastUpdateTimestampCompHeight, setLastUpdateTimestampCompHeight] = useState(0);
    useLayoutEffect(() => {
        setLastUpdateTimestampCompHeight(lastUpdateTimestampCompRef.current?.clientHeight ?? 0);
    }, [lastUpdateTimestampCompRef.current]);

    const { data: lastUpdateTimestampData } = requestManager.useGetLastGlobalUpdateTimestamp({
        /**
         * The {@link UpdateChecker} is responsible for updating the timestamp
         */
        fetchPolicy: 'cache-only',
    });
    const lastUpdateTimestamp = lastUpdateTimestampData?.lastUpdateTimestamp.timestamp;
    const date = lastUpdateTimestamp ? dateTimeFormatter.format(+lastUpdateTimestamp) : '-';

    useAppTitleAndAction(
        t`Updates`,
        <div>
            <CustomTooltip title={t`Last update`}>
                <IconButton color="inherit">{date}</IconButton>
            </CustomTooltip>
            <UpdateChecker />
        </div>,
    );

    const loadMore = useCallback(() => {
        if (isLoading || !hasNextPage) {
            return;
        }
        // oxlint-disable-next-line no-console
        console.log('Cargando más... Offset:', updateEntries.length);

        fetchMore({ variables: { offset: updateEntries.length } });
    }, [hasNextPage, isLoading, updateEntries.length, fetchMore]);

    if (error) {
        return (
            <EmptyViewAbsoluteCentered
                message={t`Unable to load data`}
                messageExtra={getErrorMessage(error)}
                retry={() => refetch().catch(defaultPromiseErrorHandler('Updates::refetch'))}
            />
        );
    }

    if (!isLoading && updateEntries.length === 0) {
        return <EmptyViewAbsoluteCentered message={t`You don't have any updates yet.`} />;
    }

    return (
        <StyledGroupedVirtuoso
            persistKey="updates"
            heightToSubtract={lastUpdateTimestampCompHeight}
            components={{
                Footer: () => (isLoading ? <LoadingPlaceholder usePadding /> : null),
            }}
            overscan={window.innerHeight * 0.5}
            endReached={loadMore}
            atBottomStateChange={(atBottom) => {
                if (atBottom && hasNextPage && !isLoading) {
                    // oxlint-disable-next-line no-console
                    console.log('atBottomStateChange()');
                    loadMore();
                }
            }}
            groupCounts={groupCounts}
            groupContent={(index) => (
                <StyledGroupHeader isFirstItem={index === 0}>
                    <Typography variant="h5" component="h2">
                        {updateGroups[index].date}
                    </Typography>
                </StyledGroupHeader>
            )}
            computeItemKey={computeItemKey}
            itemContent={(index) => {
                const entry = flatMangaEntries[index];

                if (!entry) {
                    return <div style={{ height: '92px' }} />;
                }
                return (
                    <StyledGroupItemWrapper sx={{ minHeight: '92px', display: 'block' }}>
                        <GroupedChapterUpdateCard chapters={entry.chapters} />
                    </StyledGroupItemWrapper>
                );
            }}
        />
    );
};
