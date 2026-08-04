import gql from 'graphql-tag';
import { CHAPTER_BASE_FIELDS } from '@/lib/graphql/chapter/ChapterFragments.ts';
import { MANGA_BASE_FIELDS } from '@/lib/graphql/manga/MangaFragments.ts';

export const DOWNLOAD_TYPE_FIELDS = gql`
    ${CHAPTER_BASE_FIELDS}
    ${MANGA_BASE_FIELDS}

    fragment DOWNLOAD_TYPE_FIELDS on DownloadType {
        chapter {
            ...CHAPTER_BASE_FIELDS
            isDownloaded
        }

        manga {
            ...MANGA_BASE_FIELDS
            downloadCount
        }

        progress
        state
        tries
    }
`;

export const DOWNLOAD_STATUS_FIELDS = gql`
    ${DOWNLOAD_TYPE_FIELDS}

    fragment DOWNLOAD_STATUS_FIELDS on DownloadStatus {
        state
        queue {
            ...DOWNLOAD_TYPE_FIELDS
        }
        directoryStats {
            availableSpacePretty
            folderSizePretty
        }
    }
`;

export const DOWNLOAD_UPDATES_FIELDS = gql`
    ${DOWNLOAD_TYPE_FIELDS}

    fragment DOWNLOAD_UPDATES_FIELDS on DownloadUpdates {
        state
        omittedUpdates

        updates {
            type
            download {
                ...DOWNLOAD_TYPE_FIELDS
                position
            }
        }
    }
`;
