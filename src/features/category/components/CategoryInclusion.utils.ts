/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { IncludeOrExclude } from '@/lib/graphql/generated/graphql-base.types.ts';
import type { CategoryNameInfo } from '@/features/category/Category.types.ts';
import { t as translate } from '@lingui/core/macro';

type CategoryInfo = CategoryNameInfo;

export const booleanToIncludeOrExcludeStatus = (status: boolean | null | undefined): IncludeOrExclude => {
    switch (status) {
        case false:
            return IncludeOrExclude.Exclude;
        case true:
            return IncludeOrExclude.Include;
        case null:
        case undefined:
            return IncludeOrExclude.Unset;
        default:
            throw new Error(`booleanToIncludeInStatus: unexpected IncludeOrExclude status "${status}"`);
    }
};

export const includeInUpdateStatusToBoolean = (status: IncludeOrExclude): boolean | null => {
    switch (status) {
        case IncludeOrExclude.Exclude:
            return false;
        case IncludeOrExclude.Include:
            return true;
        case IncludeOrExclude.Unset:
            return null;
        default:
            throw new Error(`includeInUpdateStatusToBoolean: unexpected IncludeOrExclude status "${status}"`);
    }
};

export const getCategoryUpdateInfo = (
    categories: CategoryInfo[],
    areIncluded: boolean,
    unsetCategoriesCount: number,
    allCategoriesCount: number,
): string => {
    const noSpecificallyIncludedCategories = areIncluded && !categories.length && unsetCategoriesCount;
    const includesAllCategories = categories.length === allCategoriesCount;

    if (noSpecificallyIncludedCategories || includesAllCategories) {
        return translate`All`;
    }

    if (!categories.length) {
        return translate`None`;
    }

    return categories.map((category) => category.name).join(', ');
};
