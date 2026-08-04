import { useEffect } from 'react';
import type { IReaderSettings } from '@/features/reader/Reader.types.ts';
import { getReaderAutoScrollStore, useReaderAutoScrollStore } from '@/features/reader/stores/ReaderStore.ts';

export const useReaderAutoScroll = (isOverlayVisible: boolean, isStaticNav: IReaderSettings['isStaticNav']): void => {
    const isPaused = useReaderAutoScrollStore('isPaused');

    useEffect(() => {
        const { pause, resume } = getReaderAutoScrollStore();

        if (isOverlayVisible && !isStaticNav) {
            pause();
            return;
        }

        resume();
    }, [isOverlayVisible, isPaused, isStaticNav]);
};
