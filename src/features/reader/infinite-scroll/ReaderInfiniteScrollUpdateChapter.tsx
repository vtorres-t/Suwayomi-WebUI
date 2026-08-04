import { memo } from 'react';
import { useReaderInfiniteScrollUpdateChapter } from '@/features/reader/infinite-scroll/useReaderInfiniteScrollUpdateChapter.ts';
import type { ChapterIdInfo } from '@/features/chapter/Chapter.types.ts';

const BaseReaderInfiniteScrollUpdateChapter = ({
    chapterId,
    previousChapterId,
    nextChapterId,
    isPreviousChapterVisible,
    isCurrentChapter,
    isNextChapterVisible,
    imageWrapper,
    scrollElement,
}: {
    chapterId: ChapterIdInfo['id'];
    previousChapterId?: ChapterIdInfo['id'];
    nextChapterId?: ChapterIdInfo['id'];
    isPreviousChapterVisible: boolean;
    isCurrentChapter: boolean;
    isNextChapterVisible: boolean;
    imageWrapper: HTMLElement | null;
    scrollElement: HTMLElement | null;
}) => {
    useReaderInfiniteScrollUpdateChapter(
        'first',
        chapterId,
        previousChapterId,
        isCurrentChapter,
        isPreviousChapterVisible,
        imageWrapper,
        scrollElement,
    );
    useReaderInfiniteScrollUpdateChapter(
        'last',
        chapterId,
        nextChapterId,
        isCurrentChapter,
        isNextChapterVisible,
        imageWrapper,
        scrollElement,
    );

    return null;
};

export const ReaderInfiniteScrollUpdateChapter = memo(BaseReaderInfiniteScrollUpdateChapter);
