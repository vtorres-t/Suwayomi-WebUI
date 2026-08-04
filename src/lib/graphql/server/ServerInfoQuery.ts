import gql from 'graphql-tag';
import { ABOUT_WEBUI, WEBUI_UPDATE_CHECK, WEBUI_UPDATE_STATUS } from '@/lib/graphql/server/InfoFragments.ts';

export const GET_ABOUT = gql`
    ${ABOUT_WEBUI}
    query GET_ABOUT {
        aboutServer {
            buildTime
            repoType
            repoUrl
            name
            version
        }
        aboutWebUI {
            ...ABOUT_WEBUI
        }
    }
`;

export const CHECK_FOR_SERVER_UPDATES = gql`
    query CHECK_FOR_SERVER_UPDATES {
        checkForServerUpdates {
            tag
            url
        }
    }
`;

export const CHECK_FOR_WEBUI_UPDATE = gql`
    ${WEBUI_UPDATE_CHECK}
    query CHECK_FOR_WEBUI_UPDATE {
        checkForWebUIUpdate {
            ...WEBUI_UPDATE_CHECK
        }
    }
`;

export const GET_WEBUI_UPDATE_STATUS = gql`
    ${WEBUI_UPDATE_STATUS}
    query GET_WEBUI_UPDATE_STATUS {
        getWebUIUpdateStatus {
            ...WEBUI_UPDATE_STATUS
        }
    }
`;
