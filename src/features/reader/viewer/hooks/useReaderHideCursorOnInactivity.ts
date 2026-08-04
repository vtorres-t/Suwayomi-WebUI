import type { MutableRefObject } from 'react';
import { useEffect, useRef } from 'react';
import { d } from 'koration';

export const useReaderHideCursorOnInactivity = (scrollElementRef: MutableRefObject<HTMLDivElement | null>) => {
    const mouseInactiveTimeout = useRef<NodeJS.Timeout>(undefined);

    useEffect(() => {
        const setCursorVisibility = (visible: boolean) => {
            const scrollElement = scrollElementRef.current;
            if (!scrollElement) {
                return;
            }

            scrollElement.style.cursor = visible ? 'default' : 'none';
        };

        const handleMouseMove = () => {
            setCursorVisibility(true);
            clearTimeout(mouseInactiveTimeout.current);
            mouseInactiveTimeout.current = setTimeout(() => {
                setCursorVisibility(false);
            }, d(5).seconds.inWholeMilliseconds);
        };

        handleMouseMove();
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            setCursorVisibility(true);
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(mouseInactiveTimeout.current);
        };
    }, []);
};
