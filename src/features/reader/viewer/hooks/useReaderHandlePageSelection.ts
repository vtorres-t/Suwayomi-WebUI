import type { MutableRefObject } from 'react';
import { useLayoutEffect } from 'react';
import type { Direction } from '@mui/material/styles';
import type { ReaderStatePages, ReadingDirection } from '@/features/reader/Reader.types.ts';
import { getIndexOfPage, getPage } from '@/features/reader/overlay/progress-bar/ReaderProgressBar.utils.tsx';
import { getScrollIntoViewInlineOption } from '@/features/reader/viewer/pager/ReaderPager.utils.tsx';
import type { ReaderControls } from '@/features/reader/services/ReaderControls.ts';
import { getReaderPagesStore } from '@/features/reader/stores/ReaderStore.ts';

export const useReaderHandlePageSelection = (
    pageToScrollToIndex: ReaderStatePages['pageToScrollToIndex'],
    pages: ReaderStatePages['pages'],
    totalPages: number,
    updateCurrentPageIndex: ReturnType<typeof ReaderControls.useUpdateCurrentPageIndex>,
    isContinuousReadingModeActive: boolean,
    imageRefs: MutableRefObject<(HTMLElement | null)[]>,
    themeDirection: Direction,
    readingDirection: ReadingDirection,
) => {
    useLayoutEffect(() => {
        if (pageToScrollToIndex == null) {
            return;
        }

        const pageToScrollTo = getPage(pageToScrollToIndex, pages);

        if (isContinuousReadingModeActive) {
            const imageRef = imageRefs.current[pageToScrollTo.pagesIndex];

            imageRef?.scrollIntoView({
                block: 'start',
                inline: getScrollIntoViewInlineOption(themeDirection, readingDirection),
            });
        }

        const newPageIndex = getIndexOfPage(pageToScrollTo);
        const isLastPage = newPageIndex === totalPages - 1;

        getReaderPagesStore().setPageToScrollToIndex(null);
        updateCurrentPageIndex(newPageIndex, !isLastPage, isLastPage);
    }, [pageToScrollToIndex]);
};
