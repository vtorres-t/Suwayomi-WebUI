import type { MangaCardMode } from '@/features/manga/Manga.types.ts';

export interface RouteStateSourcesSearchAll {
    title?: string;
    shouldShowOnlyPinnedSources?: boolean;
    mode?: MangaCardMode;
}
