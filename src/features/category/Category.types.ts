import type { LibraryOptions } from '@/features/library/Library.types.ts';
import type { CategoryMetaType, CategoryType } from '@/lib/graphql/generated/graphql-base.types.ts';

export type ICategoryMetadata = LibraryOptions;

export type CategoryMetadataKeys = keyof ICategoryMetadata;

export type CategoryIdInfo = Pick<CategoryType, 'id'>;
export type CategoryNameInfo = Pick<CategoryType, 'name'>;
export type CategoryDefaultInfo = Pick<CategoryType, 'default'>;
export type CategoryUpdateInclusionInfo = Pick<CategoryType, 'includeInUpdate'>;
export type CategoryDownloadInclusionInfo = Pick<CategoryType, 'includeInDownload'>;
export type CategoryMetadataInfo = CategoryIdInfo & { meta: Pick<CategoryMetaType, 'key' | 'value'>[] };
