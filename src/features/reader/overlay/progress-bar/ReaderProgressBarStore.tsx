import type { SliceCreator } from '@/lib/zustand/Zustand.types.ts';
import type { TReaderProgressBarContext } from '@/features/reader/overlay/progress-bar/ReaderProgressBar.types.ts';

export interface ReaderProgressBarStoreSlice {
    progressBar: TReaderProgressBarContext & {
        reset: () => ReaderProgressBarStoreSlice;
    };
}

const DEFAULT_STATE = {
    isMaximized: false,
    isDragging: false,
} satisfies Pick<ReaderProgressBarStoreSlice['progressBar'], 'isDragging' | 'isMaximized'>;

export const createReaderProgressBarStoreSlice = <T extends ReaderProgressBarStoreSlice>(
    ...[createActionName, set, get]: Parameters<SliceCreator<T>>
): ReaderProgressBarStoreSlice => ({
    progressBar: {
        ...DEFAULT_STATE,
        setIsMaximized: (maximized) =>
            set(
                (draft) => {
                    draft.progressBar.isMaximized = maximized;
                },
                undefined,
                createActionName('setIsMaximized'),
            ),
        setIsDragging: (dragging) =>
            set(
                (draft) => {
                    draft.progressBar.isDragging = dragging;
                },
                undefined,
                createActionName('setIsDragging'),
            ),
        reset: () => ({ progressBar: { ...get().progressBar, ...DEFAULT_STATE } }),
    },
});
