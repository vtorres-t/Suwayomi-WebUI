import gql from 'graphql-tag';
import { SYNC_STATUS_FIELDS } from '@/lib/graphql/sync/SyncFragments.ts';

export const SYNC_SUBSCRIPTION = gql`
    ${SYNC_STATUS_FIELDS}

    subscription SYNC {
        syncStatusChanged {
            ...SYNC_STATUS_FIELDS
        }
    }
`;
