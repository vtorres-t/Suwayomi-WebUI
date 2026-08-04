import gql from 'graphql-tag';
import { DOWNLOAD_STATUS_FIELDS } from '@/lib/graphql/download/DownloadFragments.ts';

export const GET_DOWNLOAD_STATUS = gql`
    ${DOWNLOAD_STATUS_FIELDS}

    query GET_DOWNLOAD_STATUS {
        downloadStatus {
            ...DOWNLOAD_STATUS_FIELDS
        }
    }
`;
