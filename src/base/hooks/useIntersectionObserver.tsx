import type { RefObject } from 'react';
import { useLayoutEffect, useState } from 'react';
import { STABLE_EMPTY_OBJECT } from '@/base/Base.constants.ts';

export const useIntersectionObserver = (
    ref: RefObject<HTMLElement | null> | HTMLElement | undefined | null,
    callback: IntersectionObserverCallback,
    {
        ignoreInitialObserve = false,
        root,
        rootMargin,
        threshold,
    }: IntersectionObserverInit & { ignoreInitialObserve?: boolean } = STABLE_EMPTY_OBJECT,
): (() => void) => {
    const [disconnect, setDisconnect] = useState<() => void>(() => {});

    useLayoutEffect(() => {
        const element = ref instanceof HTMLElement ? ref : ref?.current;

        if (!element) {
            return () => {};
        }

        // gets immediately observed once on initial render
        let isInitialObserve = true;
        const intersectionObserver = new IntersectionObserver(
            (...args) => {
                if (ignoreInitialObserve && isInitialObserve) {
                    isInitialObserve = false;
                    return;
                }

                callback(...args);
            },
            { root, rootMargin, threshold },
        );
        intersectionObserver.observe(element);

        setDisconnect(() => () => intersectionObserver.disconnect());

        return () => intersectionObserver.disconnect();
    }, [ref, callback, ignoreInitialObserve, root, rootMargin, threshold]);

    return disconnect;
};
