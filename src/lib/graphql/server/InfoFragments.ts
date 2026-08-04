import gql from 'graphql-tag';

export const ABOUT_WEBUI = gql`
    fragment ABOUT_WEBUI on AboutWebUI {
        tag
        repoUrl
        repoType
        updateTimestamp
    }
`;

export const WEBUI_UPDATE_CHECK = gql`
    fragment WEBUI_UPDATE_CHECK on WebUIUpdateCheck {
        tag
        updateAvailable
    }
`;

export const WEBUI_UPDATE_INFO = gql`
    fragment WEBUI_UPDATE_INFO on WebUIUpdateInfo {
        tag
    }
`;

export const WEBUI_UPDATE_STATUS = gql`
    ${WEBUI_UPDATE_INFO}
    fragment WEBUI_UPDATE_STATUS on WebUIUpdateStatus {
        info {
            ...WEBUI_UPDATE_INFO
        }
        progress
        state
    }
`;
