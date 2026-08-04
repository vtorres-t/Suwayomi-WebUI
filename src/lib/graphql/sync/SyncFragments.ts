import gql from 'graphql-tag';

export const SYNC_STATUS_FIELDS = gql`
    fragment SYNC_STATUS_FIELDS on SyncStatus {
        backupRestoreId
        endDate
        errorMessage
        startDate
        state
    }
`;
