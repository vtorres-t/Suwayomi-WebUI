import { findDuplicatesByTitleAndAlternativeTitles } from '@/features/library/util/LibraryDuplicates.util.ts';
import type { LibraryDuplicatesDescriptionWorkerInput } from '@/features/library/Library.types.ts';

self.onmessage = (event: MessageEvent<LibraryDuplicatesDescriptionWorkerInput>) => {
    const { mangasToCheck, mangas } = event.data;

    postMessage(findDuplicatesByTitleAndAlternativeTitles(mangasToCheck, mangas));
};
