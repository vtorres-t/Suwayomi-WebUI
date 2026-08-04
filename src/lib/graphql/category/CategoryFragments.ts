import gql from 'graphql-tag';

export const CATEGORY_META_FIELDS = gql`
    fragment CATEGORY_META_FIELDS on CategoryMetaType {
        categoryId
        key
        value
    }
`;

export const CATEGORY_BASE_FIELDS = gql`
    fragment CATEGORY_BASE_FIELDS on CategoryType {
        id
        name

        default
        order
    }
`;

export const CATEGORY_LIBRARY_FIELDS = gql`
    ${CATEGORY_BASE_FIELDS}
    ${CATEGORY_META_FIELDS}

    fragment CATEGORY_LIBRARY_FIELDS on CategoryType {
        ...CATEGORY_BASE_FIELDS

        meta {
            ...CATEGORY_META_FIELDS
        }
        mangas(inLibrary: true) {
            totalCount
        }
    }
`;

export const CATEGORY_SETTING_FIELDS = gql`
    ${CATEGORY_BASE_FIELDS}

    fragment CATEGORY_SETTING_FIELDS on CategoryType {
        ...CATEGORY_BASE_FIELDS

        includeInUpdate
        includeInDownload
    }
`;
