import gql from 'graphql-tag';
import { UPDATER_STATUS_FIELDS } from '@/lib/graphql/updater/UpdaterFragments.ts';

export const GET_UPDATE_STATUS = gql`
    ${UPDATER_STATUS_FIELDS}

    query GET_UPDATE_STATUS {
        libraryUpdateStatus {
            ...UPDATER_STATUS_FIELDS
        }
    }
`;

export const GET_LAST_UPDATE_TIMESTAMP = gql`
    query GET_LAST_UPDATE_TIMESTAMP {
        lastUpdateTimestamp {
            timestamp
        }
    }
`;
