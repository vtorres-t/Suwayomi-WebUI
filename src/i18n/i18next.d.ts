import 'i18next';
import en from 'public/locales/en.json';

const resources = {
    translation: en,
};

declare module 'i18next' {
    interface CustomTypeOptions {
        returnNull: false;
        resources: typeof resources;
    }
}
