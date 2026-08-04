import gql from 'graphql-tag';
import { SERVER_SETTINGS } from '@/lib/graphql/settings/SettingsFragments.ts';

export const RESET_SERVER_SETTINGS = gql`
    ${SERVER_SETTINGS}
    mutation RESET_SERVER_SETTINGS($input: ResetSettingsInput!) {
        resetSettings(input: $input) {
            settings {
                ...SERVER_SETTINGS
            }
        }
    }
`;

export const UPDATE_SERVER_SETTINGS = gql`
    ${SERVER_SETTINGS}
    mutation UPDATE_SERVER_SETTINGS($input: SetSettingsInput!) {
        setSettings(input: $input) {
            settings {
                ...SERVER_SETTINGS
            }
        }
    }
`;
