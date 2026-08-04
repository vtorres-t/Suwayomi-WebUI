import type { I18nResourceCode } from '@/i18n';

export type ISOLanguage = {
    name: string;
    nativeName: string;
};

// full list: https://github.com/meikidd/iso-639-1/blob/master/src/data.js
export const IsoLanguages: { [languageCode in I18nResourceCode]: ISOLanguage } & Record<string, ISOLanguage> = {
    // #############################
    // ###                       ###
    // ### START: manually added ###
    // ###                       ###
    // #############################
    'es-419': {
        name: 'Spanish; Castilian',
        nativeName: 'Español (Latinoamérica)',
    },
    en: {
        name: 'English',
        nativeName: 'English',
    },
    es: {
        name: 'Spanish',
        nativeName: 'Español',
    },
};
