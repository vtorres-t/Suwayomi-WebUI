import gql from 'graphql-tag';
import { WEBUI_UPDATE_INFO, WEBUI_UPDATE_STATUS } from '@/lib/graphql/server/InfoFragments.ts';

export const UPDATE_WEBUI = gql`
    ${WEBUI_UPDATE_STATUS}
    mutation UPDATE_WEBUI($input: WebUIUpdateInput = {}) {
        updateWebUI(input: $input) {
            updateStatus {
                ...WEBUI_UPDATE_STATUS
            }
        }
    }
`;

export const RESET_WEBUI_UPDATE_STATUS = gql`
    ${WEBUI_UPDATE_INFO}
    mutation RESET_WEBUI_UPDATE_STATUS {
        resetWebUIUpdateStatus {
            info {
                ...WEBUI_UPDATE_INFO
            }
            state
        }
    }
`;
