import gql from 'graphql-tag';
import { KO_SYNC_STATUS } from '@/lib/graphql/koreader/KoreaderSyncFragments.ts';

export const GET_KO_SYNC_STATUS = gql`
    ${KO_SYNC_STATUS}

    query GET_KO_SYNC_STATUS {
        koSyncStatus {
            ...KO_SYNC_STATUS
        }
    }
`;
