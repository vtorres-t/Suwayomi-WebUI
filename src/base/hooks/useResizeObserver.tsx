import type { RefObject } from 'react';
import { useLayoutEffect, useState } from 'react';

export const useResizeObserver = (
    ref: RefObject<HTMLElement | null> | HTMLElement | undefined | null,
    callback: ResizeObserverCallback,
): (() => void) => {
    const [disconnect, setDisconnect] = useState<() => void>(() => {});

    useLayoutEffect(() => {
        const element = ref instanceof HTMLElement ? ref : ref?.current;

        if (!element) {
            return () => {};
        }

        const resizeObserver = new ResizeObserver(callback);
        resizeObserver.observe(element);

        setDisconnect(() => () => resizeObserver.disconnect());

        return () => resizeObserver.disconnect();
    }, [ref, callback]);

    return disconnect;
};
