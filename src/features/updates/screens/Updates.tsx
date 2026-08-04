/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLingui } from '@lingui/react/macro';
import { requestManager } from '@/lib/requests/RequestManager.ts';
import { LoadingPlaceholder } from '@/base/components/feedback/LoadingPlaceholder.tsx';
import { EmptyViewAbsoluteCentered } from '@/base/components/feedback/EmptyViewAbsoluteCentered.tsx';
import { UpdateChecker } from '@/features/updates/components/UpdateChecker.tsx';
import { StyledGroupedVirtuoso } from '@/base/components/virtuoso/StyledGroupedVirtuoso.tsx';
import { StyledGroupHeader } from '@/base/components/virtuoso/StyledGroupHeader.tsx';
import { StyledGroupItemWrapper } from '@/base/components/virtuoso/StyledGroupItemWrapper.tsx';
import { dateTimeFormatter, epochToDate, getDateString } from '@/base/utils/DateHelper.ts';
import { defaultPromiseErrorHandler } from '@/lib/DefaultPromiseErrorHandler.ts';
import { VirtuosoUtil } from '@/lib/virtuoso/Virtuoso.util.tsx';
import { getErrorMessage } from '@/lib/HelperFunctions.ts';
import { ChapterUpdateCard } from '@/features/updates/components/ChapterUpdateCard.tsx';
import { Chapters } from '@/features/chapter/services/Chapters.ts';
import { useAppTitleAndAction } from '@/features/navigation-bar/hooks/useAppTitleAndAction.ts';
import { GROUPED_VIRTUOSO_Z_INDEX } from '@/lib/virtuoso/Virtuoso.constants.ts';
import { STABLE_EMPTY_ARRAY } from '@/base/Base.constants.ts';
import mapValues from 'lodash/fp/mapValues';
import difference from 'lodash/fp/difference';
import uniqBy from 'lodash/fp/uniqBy';
import { OffsetComponent } from '@/base/OffsetComponent.tsx';
import { CustomTooltip } from '@/base/components/CustomTooltip.tsx';
import IconButton from '@mui/material/IconButton';

export const Updates: React.FC = () => {
    const { t } = useLingui();

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
    const allUpdateEntries = chapterUpdateData?.chapters.nodes ?? STABLE_EMPTY_ARRAY;

    const [prevUpdateEntriesCount, setPrevUpdateEntriesCount] = useState(0);

    const [firstUnreadUpdatesByGroup, otherUpdatesByMangaByGroup] = useMemo(() => {
        const groupedEntries = Chapters.groupByDate(allUpdateEntries, 'fetchedAt');

        const mangaIdByGroup = mapValues(
            (groupEntries) => uniqBy('mangaId', groupEntries).map((entry) => entry.mangaId),
            groupedEntries,
        );

        const entriesByMangaByGroup = mapValues(
            (entries) => Object.groupBy(entries!, (entry) => entry.mangaId),
            groupedEntries,
        );

        const firstUnreadEntryByMangaByGroup = mapValues(
            (entriesByManga) =>
                mapValues(
                    (mangaEntries) => [mangaEntries!.findLast((entry) => !entry.isRead) ?? mangaEntries![0]],
                    entriesByManga,
                ),
            entriesByMangaByGroup,
        );
        const firstUnreadEntryByGroup = mapValues(
            (firstUnreadEntryByManga) =>
                Object.values(firstUnreadEntryByManga)
                    .flat()
                    .toSorted((a, b) => {
                        const groupMangaIds = mangaIdByGroup[getDateString(epochToDate(Number(a.fetchedAt)))];

                        return groupMangaIds.indexOf(a.mangaId) - groupMangaIds.indexOf(b.mangaId);
                    }),
            firstUnreadEntryByMangaByGroup,
        );
        const remainingEntriesByMangaByGroup = mapValues(
            (entriesByManga) =>
                mapValues(
                    (mangaEntries) =>
                        difference(
                            mangaEntries!,
                            firstUnreadEntryByMangaByGroup[
                                getDateString(epochToDate(Number(mangaEntries![0].fetchedAt)))
                            ]![mangaEntries![0].mangaId],
                        ),
                    entriesByManga,
                ),
            entriesByMangaByGroup,
        );

        return [Object.entries(firstUnreadEntryByGroup), remainingEntriesByMangaByGroup];
    }, [allUpdateEntries]);

    const firstUnreadUpdatesGroupCounts = useMemo(
        () => firstUnreadUpdatesByGroup.map((updatesByGroup) => updatesByGroup[VirtuosoUtil.ITEMS].length),
        [firstUnreadUpdatesByGroup],
    );
    const firstUnreadUpdatesEntries = useMemo(
        () => firstUnreadUpdatesByGroup.flatMap((updatesByGroup) => updatesByGroup[VirtuosoUtil.ITEMS]),
        [firstUnreadUpdatesByGroup],
    );

    const computeFirstUnreadUpdateItemKey = VirtuosoUtil.useCreateGroupedComputeItemKey(
        firstUnreadUpdatesGroupCounts,
        useCallback((index) => firstUnreadUpdatesByGroup[index][VirtuosoUtil.GROUP], [firstUnreadUpdatesByGroup]),
        useCallback((index) => firstUnreadUpdatesEntries[index].id, [firstUnreadUpdatesEntries]),
    );

    const loadMore = useCallback(() => {
        if (!hasNextPage) {
            return;
        }

        fetchMore({ variables: { offset: allUpdateEntries.length } }).then(() =>
            setPrevUpdateEntriesCount(firstUnreadUpdatesEntries.length),
        );
    }, [hasNextPage, allUpdateEntries.length, firstUnreadUpdatesEntries.length]);

    const filteredOutAllItemsOfFetchedPage =
        allUpdateEntries.length > 0 && prevUpdateEntriesCount === firstUnreadUpdatesEntries.length;
    useEffect(() => {
        if (filteredOutAllItemsOfFetchedPage && hasNextPage && !isLoading) {
            loadMore();
        }
    }, [isLoading, hasNextPage, filteredOutAllItemsOfFetchedPage, loadMore]);

    if (error) {
        return (
            <EmptyViewAbsoluteCentered
                message={t`Unable to load data`}
                messageExtra={getErrorMessage(error)}
                retry={() => refetch().catch(defaultPromiseErrorHandler('Updates::refetch'))}
            />
        );
    }

    if (!isLoading && firstUnreadUpdatesEntries.length === 0) {
        return <EmptyViewAbsoluteCentered message={t`You don't have any updates yet.`} />;
    }

    return (
        <OffsetComponent
            sx={{
                zIndex: GROUPED_VIRTUOSO_Z_INDEX,
            }}
        >
            <StyledGroupedVirtuoso
                persistKey="updates"
                components={{
                    Footer: () => (isLoading ? <LoadingPlaceholder usePadding /> : null),
                }}
                overscan={window.innerHeight * 0.5}
                endReached={loadMore}
                groupCounts={firstUnreadUpdatesGroupCounts}
                groupContent={(index) => (
                    <StyledGroupHeader isFirstItem={index === 0}>
                        <Typography variant="h5" component="h2">
                            {firstUnreadUpdatesByGroup[index][VirtuosoUtil.GROUP]}
                        </Typography>
                    </StyledGroupHeader>
                )}
                computeItemKey={computeFirstUnreadUpdateItemKey}
                itemContent={(index) => (
                    <StyledGroupItemWrapper>
                        <ChapterUpdateCard
                            chapter={firstUnreadUpdatesEntries[index]}
                            otherChapters={
                                otherUpdatesByMangaByGroup[
                                    getDateString(epochToDate(Number(firstUnreadUpdatesEntries[index].fetchedAt)))
                                ][firstUnreadUpdatesEntries[index].mangaId]
                            }
                        />
                    </StyledGroupItemWrapper>
                )}
            />
        </OffsetComponent>
    );
};
