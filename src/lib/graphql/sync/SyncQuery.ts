import gql from 'graphql-tag';
import { SYNC_STATUS_FIELDS } from '@/lib/graphql/sync/SyncFragments.ts';

export const GET_SYNC_STATUS = gql`
    ${SYNC_STATUS_FIELDS}

    query GET_SYNC_STATUS {
        lastSyncStatus {
            ...SYNC_STATUS_FIELDS
        }
    }
`;
