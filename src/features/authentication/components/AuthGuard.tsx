/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { SplashScreen } from '@/features/authentication/components/SplashScreen.tsx';
import { requestManager } from '@/lib/requests/RequestManager.ts';
import { AuthManager } from '@/features/authentication/AuthManager.ts';

export const AuthGuard = ({ children }: { children: ReactNode }) => {
    const { isAuthRequired } = AuthManager.useSession();

    const { data, error } = requestManager.useGetAbout({
        skip: isAuthRequired !== null,
    });

    useEffect(() => {
        if (error) {
            const errorMessage = error.message || '';
            const isUnauthorized = errorMessage.includes('Unauthorized');

            if (isUnauthorized && !AuthManager.isAuthInitialized()) {
                AuthManager.setAuthRequired(true); // Activa la pantalla de login nativa
                AuthManager.setAuthInitialized(true);
                return;
            }
        }

        if (!data || AuthManager.isAuthInitialized()) {
            return;
        }

        AuthManager.setAuthRequired(false);
        AuthManager.setAuthInitialized(true);
        requestManager.processQueues();
    }, [data, error]);

    if (isAuthRequired === null) {
        return <SplashScreen />;
    }

    return children;
};
