/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { useEffect, useRef } from 'react';

export function useReaderWakeLock(isLoading: boolean) {
    // Usamos any para evitar conflictos si los tipos globales del navegador no están en el proyecto
    const wakeLockSentinelRef = useRef<any | null>(null);

    useEffect(() => {
        const requestWakeLock = async () => {
            if (!('wakeLock' in navigator)) {return;}
            try {
                if (wakeLockSentinelRef.current) {return;} // Evita duplicar bloqueos

                wakeLockSentinelRef.current = await navigator.wakeLock.request('screen');

                wakeLockSentinelRef.current.addEventListener('release', () => {
                    wakeLockSentinelRef.current = null;
                });
            } catch (err) {
                // oxlint-disable-next-line no-console
                console.error('Error al activar Wake Lock en el lector:', err);
            }
        };

        const releaseWakeLock = async () => {
            if (wakeLockSentinelRef.current) {
                await wakeLockSentinelRef.current.release();
                wakeLockSentinelRef.current = null;
            }
        };

        const handleVisibilityChange = async () => {
            // Si el usuario minimizó y volvió a abrir la pestaña de lectura
            if (document.visibilityState === 'visible' && !isLoading) {
                await requestWakeLock();
            }
        };

        // Regla: Mantener pantalla encendida SOLO si ya terminó de cargar el capítulo
        if (!isLoading) {
            requestWakeLock();
            document.addEventListener('visibilitychange', handleVisibilityChange);
        } else {
            releaseWakeLock();
        }

        // Limpieza absoluta al salir del lector o si se activa una pantalla de carga
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            releaseWakeLock();
        };
    }, [isLoading]);
}
