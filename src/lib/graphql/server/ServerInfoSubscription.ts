import gql from 'graphql-tag';
import { WEBUI_UPDATE_STATUS } from '@/lib/graphql/server/InfoFragments.ts';

export const WEBUI_UPDATE_SUBSCRIPTION = gql`
    ${WEBUI_UPDATE_STATUS}
    subscription WEBUI_UPDATE {
        webUIUpdateStatusChange {
            ...WEBUI_UPDATE_STATUS
        }
    }
`;
