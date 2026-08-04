import type { MetadataDownloadSettings } from '@/features/downloads/Downloads.types.ts';
import type { MetadataLibrarySettings } from '@/features/library/Library.types.ts';
import type { MetadataClientSettings } from '@/features/device/Device.types.ts';
import type { MetadataMigrationSettings } from '@/features/migration/Migration.types.ts';
import type { MetadataBrowseSettings } from '@/features/browse/Browse.types.ts';
import type { MetadataTrackingSettings } from '@/features/tracker/Tracker.types.ts';
import type { MetadataUpdateSettings } from '@/features/app-updates/AppUpdateChecker.types.ts';
import type { MetadataThemeSettings } from '@/features/theme/AppTheme.types.ts';
import type {
    Maybe,
    SettingsDownloadConversion,
    SettingsDownloadConversionHeader,
} from '@/lib/graphql/generated/graphql-base.types.ts';
import type { MetadataHistorySettings } from '@/features/history/History.types.ts';
import type { GetServerSettingsQuery } from '@/lib/graphql/generated/graphql.ts';

export type MetadataServerSettingKeys = keyof MetadataServerSettings;

export type SearchMetadataKeys = keyof ISearchSettings;

export type MetadataServerSettings = MetadataDownloadSettings &
    MetadataLibrarySettings &
    MetadataClientSettings &
    MetadataMigrationSettings &
    MetadataBrowseSettings &
    MetadataTrackingSettings &
    MetadataUpdateSettings &
    MetadataThemeSettings &
    MetadataHistorySettings;

export interface ISearchSettings {
    ignoreFilters: boolean;
}

export type ServerSettings = Omit<GetServerSettingsQuery['settings'], '__typename'>;

export type WebUISettingsType = Pick<
    ServerSettings,
    'webUIFlavor' | 'webUIInterface' | 'electronPath' | 'webUIUpdateCheckInterval' | 'repoWebUiUrl' | 'repoWebUiType'
>;

export type GlobalUpdateSkipEntriesSettings = Pick<
    ServerSettings,
    'excludeUnreadChapters' | 'excludeNotStarted' | 'excludeCompleted'
>;

export type LibrarySettingsType = Pick<ServerSettings, 'updateMangas'>;

export enum ImageProcessingTargetMode {
    DISABLED = 'disabled',
    IMAGE = 'image',
    URL = 'url',
}

export enum ImageProcessingType {
    DOWNLOAD = 'download',
    SERVE = 'serve',
}

export type TSettingsDownloadConversionKeyValueItem = SettingsDownloadConversionHeader & {
    /**
     * The conversion object does not have a stable key, which causes issues when editing the settings
     */
    id: number;
};

export type TSettingsDownloadConversion = Omit<SettingsDownloadConversion, 'headers'> & {
    /**
     * The conversion object does not have a stable key, which causes issues when editing the settings
     */
    id: number;
    mode: ImageProcessingTargetMode;
    headers?: Maybe<TSettingsDownloadConversionKeyValueItem[]>;
    searchParams?: Maybe<TSettingsDownloadConversionKeyValueItem[]>;
};
