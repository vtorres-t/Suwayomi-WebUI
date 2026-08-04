import gql from 'graphql-tag';

export const VALIDATE_BACKUP = gql`
    query VALIDATE_BACKUP($backup: Upload!) {
        validateBackup(input: { backup: $backup }) {
            missingSources {
                id
                name
            }
            missingTrackers {
                name
            }
        }
    }
`;

export const GET_RESTORE_STATUS = gql`
    query GET_RESTORE_STATUS($id: String!) {
        restoreStatus(id: $id) {
            mangaProgress
            state
            totalManga
        }
    }
`;
