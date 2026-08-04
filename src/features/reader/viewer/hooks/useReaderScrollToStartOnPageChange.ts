import type { MutableRefObject } from 'react';
import { useLayoutEffect } from 'react';
import type { Direction } from '@mui/material/styles';
import type { ReaderStatePages, ReadingDirection } from '@/features/reader/Reader.types.ts';
import { getScrollToXForReadingDirection } from '@/features/reader/viewer/pager/ReaderPager.utils.tsx';

export const useReaderScrollToStartOnPageChange = (
    currentPageIndex: ReaderStatePages['currentPageIndex'],
    isContinuousReadingModeActive: boolean,
    themeDirection: Direction,
    readingDirection: ReadingDirection,
    scrollElementRef: MutableRefObject<HTMLDivElement | null>,
): void => {
    useLayoutEffect(() => {
        if (!isContinuousReadingModeActive) {
            scrollElementRef.current?.scrollTo(
                getScrollToXForReadingDirection(scrollElementRef.current, themeDirection, readingDirection),
                0,
            );
        }
    }, [currentPageIndex]);
};
