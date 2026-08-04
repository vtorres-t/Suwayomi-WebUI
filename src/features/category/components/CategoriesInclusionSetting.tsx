/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useLingui } from '@lingui/react/macro';
import { makeToast } from '@/base/utils/Toast.ts';
import { IncludeOrExclude } from '@/lib/graphql/generated/graphql-base.types.ts';
import { requestManager } from '@/lib/requests/RequestManager.ts';
import { getErrorMessage } from '@/lib/HelperFunctions.ts';
import {
    CategorySelectionDialog,
    type CategorySelectionResult,
} from '@/features/category/components/CategorySelectionDialog';
import { getCategoryUpdateInfo } from '@/features/category/components/CategoryInclusion.utils';
import type {
    CategoryDownloadInclusionInfo,
    CategoryIdInfo,
    CategoryNameInfo,
    CategoryUpdateInclusionInfo,
} from '@/features/category/Category.types.ts';

type CategoryType = CategoryIdInfo & CategoryNameInfo & CategoryUpdateInclusionInfo & CategoryDownloadInclusionInfo;
type CategoryIncludeField = keyof Pick<CategoryType, 'includeInUpdate' | 'includeInDownload'>;

export type CategoriesInclusionSettingProps = {
    categories: CategoryType[];
    includeField: CategoryIncludeField;
    dialogText?: string;
};

export const CategoriesInclusionSetting = ({
    categories,
    includeField,
    dialogText,
}: CategoriesInclusionSettingProps) => {
    const { t } = useLingui();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const unsetCategories = categories.filter(
        (category: CategoryType) => category[includeField] === IncludeOrExclude.Unset,
    );
    const excludedCategories = categories.filter(
        (category: CategoryType) => category[includeField] === IncludeOrExclude.Exclude,
    );
    const includedCategories = categories.filter(
        (category: CategoryType) => category[includeField] === IncludeOrExclude.Include,
    );

    const excludedCategoriesText = getCategoryUpdateInfo(
        excludedCategories,
        false,
        unsetCategories.length,
        categories.length,
    );
    const includedCategoriesText = getCategoryUpdateInfo(
        includedCategories,
        true,
        unsetCategories.length,
        categories.length,
    );

    const updateCategory = (category: CategoryType) =>
        requestManager.updateCategory(category.id, { [includeField]: category[includeField] }).response;

    const handleSaveCategories = async (result: CategorySelectionResult) => {
        const categoriesToUpdate = result.allCategories.filter((category: CategoryType) => {
            const currentCategory = categories?.find((currCategory) => currCategory.id === category.id);
            if (!currentCategory) {
                return false;
            }
            return currentCategory[includeField] !== category[includeField];
        });

        setIsDialogOpen(false);

        try {
            await Promise.all(categoriesToUpdate.map((category: CategoryType) => updateCategory(category)));
        } catch (e) {
            makeToast(t`Failed to save changes`, 'error', getErrorMessage(e));
        }
    };

    return (
        <>
            <ListItemButton onClick={() => setIsDialogOpen(true)}>
                <ListItemText
                    primary={t`Category`}
                    secondary={
                        <>
                            <span>{t`Include: ${includedCategoriesText}`}</span>
                            <span>{t`Exclude: ${excludedCategoriesText}`}</span>
                        </>
                    }
                    slotProps={{
                        secondary: { sx: { display: 'flex', flexDirection: 'column' } },
                    }}
                />
            </ListItemButton>

            <CategorySelectionDialog
                open={isDialogOpen}
                categories={categories}
                includeField={includeField}
                dialogText={dialogText}
                onClose={() => setIsDialogOpen(false)}
                onSave={handleSaveCategories}
            />
        </>
    );
};
