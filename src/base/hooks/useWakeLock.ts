import { useEffect, useRef } from 'react';

export const useWakeLock = (shouldLock: boolean) => {
    const wakeLockSentinelRef = useRef<WakeLockSentinel | null>(null);

    useEffect(() => {
        if (!('wakeLock' in navigator)) {
            return;
        }

        if (!shouldLock) {
            return;
        }

        const requestWakeLock = async () => {
            try {
                if (wakeLockSentinelRef.current) {
                    return;
                }
                wakeLockSentinelRef.current = await navigator.wakeLock.request('screen');
                wakeLockSentinelRef.current.addEventListener('release', () => {
                    wakeLockSentinelRef.current = null;
                });
            } catch {
                wakeLockSentinelRef.current = null;
            }
        };

        const releaseWakeLock = async () => {
            if (wakeLockSentinelRef.current) {
                await wakeLockSentinelRef.current.release();
                wakeLockSentinelRef.current = null;
            }
        };

        const handleVisibilityChange = async () => {
            if (document.visibilityState === 'visible' && shouldLock) {
                await requestWakeLock();
            }
        };

        requestWakeLock();
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            releaseWakeLock();
        };
    }, [shouldLock]);
};
