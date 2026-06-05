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
    });
    const hasNextPage = !!chapterHistoryData?.chapters.pageInfo.hasNextPage;
    const readEntries = chapterHistoryData?.chapters.nodes ?? STABLE_EMPTY_ARRAY;
    const historyGroups = useMemo(() => {
        const byDate = Chapters.groupByDate(readEntries, 'lastReadAt');

        return Object.entries(byDate).map(([date, chapters]) => {
            const mangaMap = new Map<number, { manga: any; chapters: any[]; lastReadAt: string }>();

            (chapters as any[]).forEach((entry) => {
                const mangaId = entry.manga.id;
                if (!mangaMap.has(mangaId)) {
                    mangaMap.set(mangaId, {
                        manga: entry.manga,
                        chapters: [],
                        lastReadAt: entry.lastReadAt, // Mantenemos el timestamp del más reciente
                    });
                }
                mangaMap.get(mangaId)!.chapters.push(entry);
            });

            return {
                date,
                mangaGroups: Array.from(mangaMap.values()),
            };
        });
    }, [readEntries]);
    const groupCounts = useMemo(() => historyGroups.map((group) => group.mangaGroups.length), [historyGroups]);

    const flatMangaEntries = useMemo(() => historyGroups.flatMap((g) => g.mangaGroups), [historyGroups]);

    const computeItemKey = VirtuosoUtil.useCreateGroupedComputeItemKey(
        groupCounts,
        useCallback((index) => historyGroups[index].date, [historyGroups]),
        useCallback(
            (index) => `${flatMangaEntries[index].manga.id}-${flatMangaEntries[index].lastReadAt}`,
            [flatMangaEntries],
        ),
    );

    const loadMore = useCallback(() => {
        if (isLoading || !hasNextPage) {
            return;
        }
        // oxlint-disable-next-line no-console
        console.log('Cargando más... Offset:', readEntries.length);

        fetchMore({
            variables: { offset: readEntries.length },
        }).catch(defaultPromiseErrorHandler('History::loadMore'));
    }, [hasNextPage, isLoading, readEntries.length, fetchMore]);

    React.useEffect(() => {
        // Si no estamos cargando, hay más páginas, pero la lista es muy corta
        // (menos de 5 filas), forzamos la carga de más capítulos.
        if (!isLoading && hasNextPage && flatMangaEntries.length < 5) {
            loadMore();
        }
    }, [flatMangaEntries.length, isLoading, hasNextPage, loadMore]);

    if (error) {
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
                        {historyGroups[index].date}
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
                        <GroupedChapterHistoryCard chapters={entry.chapters} />
                    </StyledGroupItemWrapper>
                );
            }}
        />
    );
};
