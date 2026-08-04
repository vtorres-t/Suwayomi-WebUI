import { useCallback, useState } from 'react';
import { CombinedGraphQLErrors } from '@apollo/client';
import { requestManager } from '@/lib/requests/RequestManager.ts';
import { baseCleanup } from '@/base/utils/Strings.ts';

export const useRefreshManga = (mangaId: string) => {
    const [fetchingOnline, setFetchingOnline] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const handleRefresh = useCallback(async () => {
        setFetchingOnline(true);
        setError(null);

        const handleError = (e: unknown) => {
            if (CombinedGraphQLErrors.is(e) && baseCleanup(e.message) === 'no chapters found') {
                return;
            }

            setError(e);
        };

        try {
            const { error: tmpError } = await requestManager.refreshManga(mangaId, {
                awaitRefetchQueries: true,
                errorPolicy: 'all',
            }).response;

            handleError(tmpError);
        } catch (e) {
            handleError(e);
        } finally {
            setFetchingOnline(false);
        }
    }, [mangaId]);

    return [handleRefresh, { loading: fetchingOnline, error }] as const;
};
