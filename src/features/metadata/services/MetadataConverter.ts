import type { MetaType } from '@/lib/graphql/generated/graphql-base.types.ts';
import type { AllowedMetadataValueTypes, AppMetadataKeys, Metadata } from '@/features/metadata/Metadata.types.ts';
import { APP_METADATA } from '@/features/metadata/Metadata.constants.ts';

export const convertValueFromMetadata = <T extends AllowedMetadataValueTypes = AllowedMetadataValueTypes>(
    key: string,
    value: string,
    defaultValue: any,
): T => APP_METADATA[key as AppMetadataKeys].convert(value, defaultValue);

export const convertFromGqlMeta = (
    gqlMetadata?: MetaType[],
    filter: (key: string) => boolean = () => true,
): Metadata | undefined => {
    if (!gqlMetadata) {
        return undefined;
    }

    const metadata: Metadata = {};
    gqlMetadata.forEach(({ key, value }) => {
        if (filter(key)) {
            metadata[key] = value;
        }
    });

    return metadata;
};

export const convertToGqlMeta = (metadata?: Metadata): MetaType[] | undefined => {
    if (!metadata) {
        return undefined;
    }

    return Object.entries(metadata).map(([key, value]) => ({ key, value }));
};
