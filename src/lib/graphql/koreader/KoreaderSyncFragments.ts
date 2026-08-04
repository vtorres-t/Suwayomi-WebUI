import gql from 'graphql-tag';

export const KO_SYNC_STATUS = gql`
    fragment KO_SYNC_STATUS on KoSyncStatusPayload {
        isLoggedIn
        serverAddress
        username
    }
`;
