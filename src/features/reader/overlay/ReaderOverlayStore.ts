import type { SliceCreator } from '@/lib/zustand/Zustand.types.ts';

export interface ReaderOverlayStoreSlice {
    overlay: {
        isVisible: boolean;
        setIsVisible: (visible: boolean) => void;
        reset: () => ReaderOverlayStoreSlice;
    };
}

const DEFAULT_STATE = {
    isVisible: false,
} satisfies Pick<ReaderOverlayStoreSlice['overlay'], 'isVisible'>;

export const createReaderOverlayStoreSlice = <T extends ReaderOverlayStoreSlice>(
    ...[createActionName, set, get]: Parameters<SliceCreator<T>>
): ReaderOverlayStoreSlice => ({
    overlay: {
        isVisible: DEFAULT_STATE.isVisible,
        setIsVisible: (visible) =>
            set(
                (draft) => {
                    draft.overlay.isVisible = visible;
                },
                undefined,
                createActionName('setIsVisible'),
            ),
        reset: () => ({ overlay: { ...get().overlay, ...DEFAULT_STATE } }),
    },
});
