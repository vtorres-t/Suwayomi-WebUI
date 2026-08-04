import gql from 'graphql-tag';
import { SERVER_SETTINGS } from '@/lib/graphql/settings/SettingsFragments.ts';

export const GET_SERVER_SETTINGS = gql`
    ${SERVER_SETTINGS}
    query GET_SERVER_SETTINGS {
        settings {
            ...SERVER_SETTINGS
        }
    }
`;
