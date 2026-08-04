import { useLocalStorage } from '@/base/hooks/useStorage.tsx';

export const getPersistedServerSetting = <T,>(serverValue: T | undefined, lastValue: T): T => {
    const isDisabled = serverValue === 0;
    if (isDisabled) {
        return lastValue;
    }

    return serverValue ?? lastValue;
};

export const usePersistedValue = <T,>(
    key: string,
    defaultValue: T,
    currentValue: T | undefined,
    getCurrentValue: (currentValue: T | undefined, persistedValue: T) => T,
): [T, (value: T) => void] => {
    const [persistedValue, setPersistedValue] = useLocalStorage(key, defaultValue);

    const value = getCurrentValue(currentValue, persistedValue);

    return [value, setPersistedValue];
};
