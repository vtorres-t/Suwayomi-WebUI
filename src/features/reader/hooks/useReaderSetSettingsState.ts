import { useEffect } from 'react';
import type { useDefaultReaderSettings } from '@/features/reader/settings/ReaderSettingsMetadata.ts';
import { getReaderSettings, getReaderSettingsFor } from '@/features/reader/settings/ReaderSettingsMetadata.ts';
import { isAutoWebtoonMode } from '@/features/reader/settings/ReaderSettings.utils.tsx';
import { ReadingMode } from '@/features/reader/Reader.types.ts';
import type { GetMangaReaderQuery } from '@/lib/graphql/generated/graphql.ts';
import type { requestManager } from '@/lib/requests/RequestManager.ts';
import { getReaderSettingsStore } from '@/features/reader/stores/ReaderStore.ts';

export const useReaderSetSettingsState = (
    mangaResponse: ReturnType<typeof requestManager.useGetManga<GetMangaReaderQuery>>,
    defaultSettingsResponse: ReturnType<typeof useDefaultReaderSettings>['request'],
    defaultSettings: ReturnType<typeof useDefaultReaderSettings>['settings'],
    defaultSettingsMetadata: ReturnType<typeof useDefaultReaderSettings>['metadata'],
    setAreSettingsSet: (areSet: boolean) => void,
) => {
    useEffect(() => {
        const mangaFromResponse = mangaResponse.data?.manga;
        if (!mangaFromResponse || defaultSettingsResponse.loading || defaultSettingsResponse.error) {
            return;
        }

        const settingsWithDefaultProfileFallback = getReaderSettingsFor(mangaFromResponse, defaultSettings);

        const shouldUseWebtoonMode = isAutoWebtoonMode(
            mangaFromResponse,
            settingsWithDefaultProfileFallback.shouldUseAutoWebtoonMode,
            settingsWithDefaultProfileFallback.readingMode,
        );

        const defaultSettingsWithAutoReadingMode = {
            ...defaultSettings,
            readingMode: shouldUseWebtoonMode ? ReadingMode.WEBTOON : defaultSettings.readingMode,
        };

        const profile = shouldUseWebtoonMode
            ? ReadingMode.WEBTOON
            : settingsWithDefaultProfileFallback.readingMode.value;
        const profileSettings = getReaderSettings(
            'global',
            { meta: defaultSettingsMetadata! },
            defaultSettingsWithAutoReadingMode,
            undefined,
            profile,
        );

        const finalSettings = getReaderSettingsFor(mangaFromResponse, profileSettings);
        getReaderSettingsStore().setSettings(finalSettings);
        setAreSettingsSet(true);
    }, [mangaResponse.data?.manga, defaultSettings]);
};
