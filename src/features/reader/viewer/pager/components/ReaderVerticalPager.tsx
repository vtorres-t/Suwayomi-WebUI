import { memo } from 'react';
import { BasePager } from '@/features/reader/viewer/pager/components/BasePager.tsx';
import type { ReaderPagerProps } from '@/features/reader/Reader.types.ts';
import { createReaderPage } from '@/features/reader/viewer/pager/ReaderPager.utils.tsx';
import { getPageGap } from '@/features/reader/settings/ReaderSettings.utils.tsx';

const BaseReaderVerticalPager = ({
    onLoad,
    onError,
    pageLoadStates,
    retryFailedPagesKeyPrefix,
    isPreloadMode,
    ...props
}: ReaderPagerProps) => {
    const { currentPageIndex, totalPages, readingMode, pageGap } = props;

    return (
        <BasePager
            {...props}
            createPage={(page, pagesIndex, shouldLoad, _, setRef, ...baseProps) =>
                createReaderPage(
                    page,
                    pagesIndex,
                    true,
                    pageLoadStates[page.primary.index].loaded,
                    isPreloadMode,
                    onLoad,
                    onError,
                    shouldLoad || pageLoadStates[page.primary.index].loaded,
                    !isPreloadMode,
                    currentPageIndex,
                    totalPages,
                    ...baseProps,
                    pageLoadStates[page.primary.index].error ? retryFailedPagesKeyPrefix : undefined,
                    undefined,
                    undefined,
                    page.primary.index !== 0 ? getPageGap(pageGap, readingMode) : 0,
                    setRef,
                )
            }
            slots={{ boxProps: { sx: { margin: 'auto' } } }}
        />
    );
};

export const ReaderVerticalPager = memo(BaseReaderVerticalPager);
