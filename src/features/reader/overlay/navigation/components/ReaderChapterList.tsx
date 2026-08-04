import type { VirtuosoProps } from 'react-virtuoso';
import { Virtuoso } from 'react-virtuoso';
import { useMemo } from 'react';
import type { ReaderStateChapters } from '@/features/reader/Reader.types.ts';
import { ChapterListCard } from '@/features/chapter/components/cards/ChapterListCard.tsx';
import type { ChapterIdInfo } from '@/features/chapter/Chapter.types.ts';

const onSelectNoop = () => {};

export const ReaderChapterList = ({
    currentChapterId,
    chapters,
    style,
}: {
    currentChapterId: ChapterIdInfo['id'] | undefined;
} & Pick<ReaderStateChapters, 'chapters'> &
    Pick<VirtuosoProps<any, any>, 'style'>) => {
    const currentChapterIndex = useMemo(() => {
        if (currentChapterId === undefined) {
            return 0;
        }

        return chapters.findIndex((chapter) => chapter.id === currentChapterId);
    }, [currentChapterId, chapters]);

    return (
        <Virtuoso
            style={{
                height: `calc(${chapters.length} * 100px)`,
                ...style,
            }}
            initialTopMostItemIndex={currentChapterIndex}
            totalCount={chapters.length}
            computeItemKey={(index) => chapters[index].id}
            itemContent={(index) => (
                <ChapterListCard
                    index={index}
                    chapters={chapters}
                    isSortDesc
                    mode="reader"
                    showChapterNumber={false}
                    selected={null}
                    onSelect={onSelectNoop}
                    selectable={false}
                    isActiveChapter={index === currentChapterIndex}
                />
            )}
            increaseViewportBy={400}
        />
    );
};
