import gql from 'graphql-tag';
import { UPDATER_STATUS_FIELDS } from '@/lib/graphql/updater/UpdaterFragments.ts';

export const UPDATE_LIBRARY = gql`
    ${UPDATER_STATUS_FIELDS}

    mutation UPDATE_LIBRARY($input: UpdateLibraryInput = {}) {
        updateLibrary(input: $input) {
            updateStatus {
                ...UPDATER_STATUS_FIELDS
            }
        }
    }
`;

export const STOP_UPDATER = gql`
    mutation STOP_UPDATER($input: UpdateStopInput = {}) {
        updateStop(input: $input) {
            clientMutationId
        }
    }
`;
