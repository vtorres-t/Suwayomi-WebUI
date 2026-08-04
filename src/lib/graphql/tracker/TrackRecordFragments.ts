import gql from 'graphql-tag';

export const TRACK_RECORD_SEARCH_FIELDS = gql`
    fragment TRACK_RECORD_SEARCH_FIELDS on TrackSearchType {
        id
        remoteId
        title
        trackingUrl
        coverUrl
        publishingType
        startDate
        publishingStatus
        summary
        score
        totalChapters
    }
`;

export const TRACK_RECORD_BIND_FIELDS = gql`
    fragment TRACK_RECORD_BIND_FIELDS on TrackRecordType {
        id
        remoteId
        trackerId
        remoteUrl
        title
        status
        lastChapterRead
        totalChapters
        score
        displayScore
        startDate
        finishDate
        private
    }
`;
