import gql from 'graphql-tag';
import { EXTENSION_STORE_FIELDS } from '@/lib/graphql/extension/store/ExtensionStoreFragments.ts';

export const ADD_EXTENSION_STORE = gql`
    ${EXTENSION_STORE_FIELDS}

    mutation ADD_EXTENSION_STORE($input: AddExtensionStoreInput!) {
        addExtensionStore(input: $input) {
            extensionStore {
                ...EXTENSION_STORE_FIELDS
            }
        }
    }
`;

export const REMOVE_EXTENSION_STORE = gql`
    ${EXTENSION_STORE_FIELDS}

    mutation REMOVE_EXTENSION_STORE($input: RemoveExtensionStoreInput!) {
        removeExtensionStore(input: $input) {
            extensionStore {
                ...EXTENSION_STORE_FIELDS
            }
        }
    }
`;
