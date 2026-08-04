import gql from 'graphql-tag';

export const EXTENSION_STORE_FIELDS = gql`
    fragment EXTENSION_STORE_FIELDS on ExtensionStoreType {
        badgeLabel
        contactDiscord
        contactWebsite
        extensionListUrl
        indexUrl
        isLegacy
        name
        signingKey
        extensions {
            totalCount
        }
    }
`;
