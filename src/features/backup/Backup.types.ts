import type { PartialBackupFlagsInput } from '@/lib/graphql/generated/graphql-base.types.ts';
import type { ServerSettings } from '@/features/settings/Settings.types.ts';

export enum BackupFlagGroup {
    LIBRARY = 'library',
    SETTINGS = 'settings',
}

export type BackupFlag = keyof PartialBackupFlagsInput;

export type BackupFlagInclusionState = Record<BackupFlag, boolean>;

export type AutoBackupFlag = Pick<
    ServerSettings,
    | 'autoBackupIncludeCategories'
    | 'autoBackupIncludeChapters'
    | 'autoBackupIncludeClientData'
    | 'autoBackupIncludeHistory'
    | 'autoBackupIncludeManga'
    | 'autoBackupIncludeServerSettings'
    | 'autoBackupIncludeTracking'
>;

export type AutoBackupFlagInclusionState = Record<keyof AutoBackupFlag, boolean>;

export type BackupSettingsType = Pick<
    ServerSettings,
    | 'backupPath'
    | 'backupTime'
    | 'backupInterval'
    | 'backupTTL'
    | 'autoBackupIncludeCategories'
    | 'autoBackupIncludeChapters'
    | 'autoBackupIncludeClientData'
    | 'autoBackupIncludeHistory'
    | 'autoBackupIncludeManga'
    | 'autoBackupIncludeServerSettings'
    | 'autoBackupIncludeTracking'
>;
