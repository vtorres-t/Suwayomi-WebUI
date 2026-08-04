import gql from 'graphql-tag';

export const CREATE_BACKUP = gql`
    mutation CREATE_BACKUP($input: CreateBackupInput!) {
        createBackup(input: $input) {
            url
        }
    }
`;

export const RESTORE_BACKUP = gql`
    mutation RESTORE_BACKUP($backup: Upload!, $flags: PartialBackupFlagsInput) {
        restoreBackup(input: { backup: $backup, flags: $flags }) {
            id
            status {
                mangaProgress
                state
                totalManga
            }
        }
    }
`;
