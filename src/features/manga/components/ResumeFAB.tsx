import { Link } from 'react-router-dom';
import PlayArrow from '@mui/icons-material/PlayArrow';
import { useLingui } from '@lingui/react/macro';
import { StyledFab } from '@/base/components/buttons/StyledFab.tsx';
import { Chapters } from '@/features/chapter/services/Chapters.ts';
import type {
    ChapterMangaInfo,
    ChapterNameInfo,
    ChapterNumberInfo,
    ChapterReadInfo,
    ChapterScanlatorInfo,
    ChapterSourceOrderInfo,
} from '@/features/chapter/Chapter.types.ts';
import { ContinueReadingTooltip } from '@/features/manga/components/ContinueReadingTooltip.tsx';
import { AppRoutes } from '@/base/AppRoute.constants.ts';
import { ReaderService } from '@/features/reader/services/ReaderService.ts';

export function ResumeFab({
    chapter,
}: {
    chapter: ChapterMangaInfo &
        ChapterSourceOrderInfo &
        ChapterReadInfo &
        ChapterNumberInfo &
        ChapterNameInfo &
        ChapterScanlatorInfo;
}) {
    const { t } = useLingui();

    const { sourceOrder, name, chapterNumber, scanlator } = chapter;
    const isFirstChapter = sourceOrder === 1;

    const getContinueReadingText = (): string => {
        const label = isFirstChapter ? t`Start` : t`Resume`;
        return `${label} (${chapterNumber})`;
    };

    return (
        <ContinueReadingTooltip
            chapterNumber={chapterNumber}
            name={name}
            sourceOrder={sourceOrder}
            scanlator={scanlator}
        >
            <StyledFab
                component={Link}
                variant="extended"
                color="primary"
                to={AppRoutes.reader.path(chapter.mangaId, chapter.sourceOrder)}
                state={Chapters.getReaderOpenChapterLocationState(chapter)}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    ReaderService.openReader(chapter);
                }}
            >
                <PlayArrow sx={{ mr: 1 }} />
                {getContinueReadingText()}
            </StyledFab>
        </ContinueReadingTooltip>
    );
}
