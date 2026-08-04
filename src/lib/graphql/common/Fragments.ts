import gql from 'graphql-tag';

export const PAGE_INFO = gql`
    fragment PAGE_INFO on PageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
    }
`;

export const GLOBAL_METADATA = gql`
    fragment GLOBAL_METADATA on GlobalMetaType {
        key
        value
    }
`;
