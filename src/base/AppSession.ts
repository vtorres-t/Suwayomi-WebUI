import { BrowserUtil } from '@/lib/BrowserUtil.ts';
import { AppStorage } from '@/lib/storage/AppStorage.ts';

const STARTUP_TIMESTAMP_KEY = 'webUIStartupTimestamp';

class AppSessionClass {
    constructor() {
        if (BrowserUtil.isActualPageLoad()) {
            AppStorage.session.setItem(STARTUP_TIMESTAMP_KEY, Date.now());
        }
    }

    get STARTUP_TIMESTAMP(): number {
        return AppStorage.session.getItemParsed(STARTUP_TIMESTAMP_KEY, Date.now());
    }

    isSecureContext(): boolean {
        return window.isSecureContext;
    }
}

export const AppSession = new AppSessionClass();
