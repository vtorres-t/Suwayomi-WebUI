import gql from 'graphql-tag';
import { PAGE_INFO } from '@/lib/graphql/common/Fragments.ts';
import { EXTENSION_STORE_FIELDS } from '@/lib/graphql/extension/store/ExtensionStoreFragments.ts';

export const GET_EXTENSION_STORE = gql`
    ${EXTENSION_STORE_FIELDS}

    query GET_EXTENSION_STORE($indexUrl: String!) {
        extensionStore(indexUrl: $indexUrl) {
            ...EXTENSION_STORE_FIELDS
        }
    }
`;

export const GET_EXTENSION_STORES = gql`
    ${EXTENSION_STORE_FIELDS}
    ${PAGE_INFO}

    query GET_EXTENSION_STORES {
        extensionStores {
            nodes {
                ...EXTENSION_STORE_FIELDS
            }
            pageInfo {
                ...PAGE_INFO
            }
            totalCount
        }
    }
`;
