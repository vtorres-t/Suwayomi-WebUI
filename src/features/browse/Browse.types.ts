import type { SourceIdInfo } from '@/features/source/Source.types.ts';

export type MetadataBrowseSettings = {
    hideLibraryEntries: boolean;
    browseLanguages: string[];
    showNsfw: boolean;
    lastUsedSourceId: SourceIdInfo['id'] | null;
    shouldShowOnlySourcesWithResults: boolean;
};

export enum BrowseTab {
    SOURCE_DEPRECATED = 'source',
    SOURCES = 'sources',
    EXTENSIONS = 'extensions',
    MIGRATE = 'migrate',
}
