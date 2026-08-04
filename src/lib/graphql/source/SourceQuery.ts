import gql from 'graphql-tag';
import {
    SOURCE_BASE_FIELDS,
    SOURCE_BROWSE_FIELDS,
    SOURCE_LIST_FIELDS,
    SOURCE_SETTING_FIELDS,
} from '@/lib/graphql/source/SourceFragments.ts';

export const GET_SOURCE_BROWSE = gql`
    ${SOURCE_BROWSE_FIELDS}

    query GET_SOURCE_BROWSE($id: LongString!) {
        source(id: $id) {
            ...SOURCE_BROWSE_FIELDS
        }
    }
`;

export const GET_SOURCE_SETTINGS = gql`
    ${SOURCE_SETTING_FIELDS}

    query GET_SOURCE_SETTINGS($id: LongString!) {
        source(id: $id) {
            ...SOURCE_SETTING_FIELDS
        }
    }
`;

export const GET_SOURCE_MIGRATABLE = gql`
    ${SOURCE_BASE_FIELDS}

    query GET_SOURCE_MIGRATABLE($id: LongString!) {
        source(id: $id) {
            ...SOURCE_BASE_FIELDS
        }
    }
`;

export const GET_SOURCES_LIST = gql`
    ${SOURCE_LIST_FIELDS}

    query GET_SOURCES_LIST {
        sources {
            nodes {
                ...SOURCE_LIST_FIELDS
            }
        }
    }
`;

export const GET_MIGRATABLE_SOURCES = gql`
    ${SOURCE_BASE_FIELDS}

    query GET_MIGRATABLE_SOURCES {
        mangas(condition: { inLibrary: true }) {
            nodes {
                sourceId
                source {
                    ...SOURCE_BASE_FIELDS
                }
            }
        }
    }
`;
