import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react/macro';
import { requestManager } from '@/lib/requests/RequestManager.ts';
import { makeToast } from '@/base/utils/Toast.ts';
import { AppRoutes } from '@/base/AppRoute.constants.ts';
import { getErrorMessage } from '@/lib/HelperFunctions.ts';

export const TrackerOAuthLogin = () => {
    const { t } = useLingui();
    const navigate = useNavigate();

    const url = new URL(window.location.href);
    const { trackerId, trackerName }: { trackerId: number; trackerName: string } = JSON.parse(
        url.searchParams.get('state') ?? '{}',
    );

    useEffect(() => {
        const login = async () => {
            try {
                await requestManager.loginToTrackerOauth(trackerId, window.location.href).response;
            } catch (e) {
                makeToast(t`Could not log in to ${trackerName}`, 'error', getErrorMessage(e));
            }

            navigate(AppRoutes.settings.children.tracking.path, { replace: true });
        };

        login();
    }, [trackerId]);

    return t`Logging in to ${trackerName}…`;
};
