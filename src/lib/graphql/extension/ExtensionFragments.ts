import gql from 'graphql-tag';

export const EXTENSION_LIST_FIELDS = gql`
    fragment EXTENSION_LIST_FIELDS on ExtensionType {
        pkgName
        name
        lang
        versionCodeLong
        versionName
        iconUrl
        storeIndexUrl
        contentWarning
        isInstalled
        isObsolete
        hasUpdate
        extensionLib
        extensionStore {
            indexUrl
            name
        }
    }
`;
