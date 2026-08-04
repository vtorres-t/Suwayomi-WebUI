import gql from 'graphql-tag';
import { TRACK_RECORD_BIND_FIELDS } from '@/lib/graphql/tracker/TrackRecordFragments.ts';

export const TRACKER_BASE_FIELDS = gql`
    fragment TRACKER_BASE_FIELDS on TrackerType {
        id
        name
        icon
        isLoggedIn
        isTokenExpired
    }
`;

export const TRACKER_SETTING_FIELDS = gql`
    ${TRACKER_BASE_FIELDS}

    fragment TRACKER_SETTING_FIELDS on TrackerType {
        ...TRACKER_BASE_FIELDS

        authUrl
    }
`;

export const TRACKER_BIND_FIELDS = gql`
    ${TRACKER_BASE_FIELDS}
    ${TRACK_RECORD_BIND_FIELDS}

    fragment TRACKER_BIND_FIELDS on TrackerType {
        ...TRACKER_BASE_FIELDS

        icon

        supportsPrivateTracking
        supportsTrackDeletion
        scores
        statuses {
            name
            value
        }

        trackRecords {
            nodes {
                ...TRACK_RECORD_BIND_FIELDS
            }
        }
    }
`;
