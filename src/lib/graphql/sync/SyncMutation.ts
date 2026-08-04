import gql from 'graphql-tag';

export const START_SYNC = gql`
    mutation START_SYNC($input: StartSyncInput = {}) {
        startSync(input: $input) {
            result
        }
    }
`;
