import type { MetadataHolderType } from '@/features/metadata/Metadata.types.ts';

export class MetadataValueCache {
    private static convertedValueByKey = new Map<string, unknown>();

    private static rawValueByKey = new Map<string, string | undefined>();

    private static getCacheKey(type: MetadataHolderType, holderId: string | number | undefined, key: string): string {
        return `${type}::${holderId ?? ''}::${key}`;
    }

    static getCachedValue<T>(
        type: MetadataHolderType,
        holderId: string | number | undefined,
        key: string,
    ): T | undefined {
        return this.convertedValueByKey.get(this.getCacheKey(type, holderId, key)) as T | undefined;
    }

    static getStableValue<T>(
        type: MetadataHolderType,
        holderId: string | number | undefined,
        key: string,
        rawValue: string | undefined,
        newValue: T,
    ): T {
        const cacheKey = this.getCacheKey(type, holderId, key);
        const cachedRawValue = this.rawValueByKey.get(cacheKey);
        const cachedConvertedValue = this.getCachedValue<T>(type, holderId, key);

        if (cachedRawValue !== undefined && rawValue === cachedRawValue) {
            return cachedConvertedValue as T;
        }

        this.rawValueByKey.set(cacheKey, rawValue);
        this.convertedValueByKey.set(cacheKey, newValue);

        return newValue;
    }
}
