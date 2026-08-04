import type { ReactElement } from 'react';
import { useLingui } from '@lingui/react/macro';
import { CustomTooltip } from '@/base/components/CustomTooltip';
import type {
    ChapterNameInfo,
    ChapterNumberInfo,
    ChapterScanlatorInfo,
    ChapterSourceOrderInfo,
} from '@/features/chapter/Chapter.types.ts';

export const ContinueReadingTooltip = ({
    children,
    chapterNumber,
    name,
    sourceOrder,
    scanlator,
}: ChapterNumberInfo &
    ChapterSourceOrderInfo &
    ChapterNameInfo &
    ChapterScanlatorInfo & {
        children: ReactElement;
    }) => {
    const { t } = useLingui();

    const isFirstChapter = sourceOrder === 1;

    return (
        <CustomTooltip
            slotProps={{
                tooltip: {
                    sx: {
                        whiteSpace: 'pre-line',
                    },
                },
            }}
            title={
                isFirstChapter
                    ? t`Start reading\n#${chapterNumber} — ${name}\n${scanlator}`
                    : t`Continue reading\n#${chapterNumber} — ${name}\n${scanlator}`
            }
        >
            {children}
        </CustomTooltip>
    );
};
