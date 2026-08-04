export class BrowserUtil {
    static isActualPageLoad(): boolean {
        const navEntries = performance.getEntriesByType('navigation');

        if (!navEntries.length) {
            return true;
        }

        const { type } = navEntries[0] as PerformanceNavigationTiming;

        return ['reload', 'navigate'].includes(type);
    }
}
