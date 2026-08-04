import type { Palette } from '@vibrant/color';
import type { FastAverageColorResult } from 'fast-average-color';
import type { AppTheme, AppThemes } from '@/features/theme/services/AppThemes.ts';

export enum ThemeMode {
    SYSTEM = 'system',
    DARK = 'dark',
    LIGHT = 'light',
}

export type TAppThemeContext = {
    appTheme: AppThemes;
    setAppTheme: (theme: AppThemes) => void;
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    shouldUsePureBlackMode: boolean;
    setShouldUsePureBlackMode: (value: boolean) => void;
    dynamicColor: (NonNullableProperties<Palette> & { average: FastAverageColorResult }) | null;
    setDynamicColor: React.Dispatch<
        React.SetStateAction<(NonNullableProperties<Palette> & { average: FastAverageColorResult }) | null>
    >;
};
export type MetadataThemeSettings = {
    locale: string;
    appTheme: AppThemes;
    themeMode: ThemeMode;
    shouldUsePureBlackMode: boolean;
    customThemes: Record<string, AppTheme>;
    mangaThumbnailBackdrop: boolean;
    mangaDynamicColorSchemes: boolean;
    mangaGridItemWidth: number;
};
