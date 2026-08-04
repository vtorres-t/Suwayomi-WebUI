import { useEffect } from 'react';
import { getReaderStore } from '@/features/reader/stores/ReaderStore.ts';

export const useReaderResetStates = () => {
    useEffect(
        () => () => {
            getReaderStore().reset();
        },
        [],
    );
};
