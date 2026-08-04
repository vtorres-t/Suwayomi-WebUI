import gql from 'graphql-tag';
import { DOWNLOAD_UPDATES_FIELDS } from '@/lib/graphql/download/DownloadFragments.ts';

export const DOWNLOAD_STATUS_SUBSCRIPTION = gql`
    ${DOWNLOAD_UPDATES_FIELDS}

    subscription DOWNLOAD_STATUS($input: DownloadChangedInput!) {
        downloadStatusChanged(input: $input) {
            ...DOWNLOAD_UPDATES_FIELDS
        }
    }
`;
