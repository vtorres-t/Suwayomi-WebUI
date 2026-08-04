import type { MutableRefObject } from 'react';
import { useEffect } from 'react';
import {
    getReaderOverlayStore,
    getReaderTapZoneStore,
    useReaderTapZoneStore,
} from '@/features/reader/stores/ReaderStore.ts';

export const useReaderHideOverlayOnUserScroll = (
    isOverlayVisible: boolean,
    scrollElementRef: MutableRefObject<HTMLDivElement | null>,
) => {
    const showPreview = useReaderTapZoneStore('showPreview');

    useEffect(() => {
        const handleScroll = () => {
            if (isOverlayVisible) {
                getReaderOverlayStore().setIsVisible(false);
            }

            if (showPreview) {
                getReaderTapZoneStore().setShowPreview(false);
            }
        };

        scrollElementRef.current?.addEventListener('wheel', handleScroll, { passive: true });
        scrollElementRef.current?.addEventListener('touchmove', handleScroll, { passive: true });
        return () => {
            scrollElementRef.current?.removeEventListener('wheel', handleScroll);
            scrollElementRef.current?.removeEventListener('touchmove', handleScroll);
        };
    }, [isOverlayVisible, showPreview]);
};
