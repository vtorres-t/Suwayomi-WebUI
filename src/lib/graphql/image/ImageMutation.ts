import gql from 'graphql-tag';

export const CLEAR_SERVER_CACHE = gql`
    mutation CLEAR_SERVER_CACHE($input: ClearCachedImagesInput!) {
        clearCachedImages(input: $input) {
            cachedPages
            cachedThumbnails
            downloadedThumbnails
        }
    }
`;
