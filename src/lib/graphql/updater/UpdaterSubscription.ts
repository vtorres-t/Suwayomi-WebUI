import gql from 'graphql-tag';
import { UPDATER_SUBSCRIPTION_FIELDS } from '@/lib/graphql/updater/UpdaterFragments.ts';

export const UPDATER_SUBSCRIPTION = gql`
    ${UPDATER_SUBSCRIPTION_FIELDS}

    subscription UPDATER($input: LibraryUpdateStatusChangedInput!) {
        libraryUpdateStatusChanged(input: $input) {
            ...UPDATER_SUBSCRIPTION_FIELDS
        }
    }
`;
