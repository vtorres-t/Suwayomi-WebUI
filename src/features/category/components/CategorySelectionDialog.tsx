/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useLingui } from '@lingui/react/macro';
import { ThreeStateCheckboxInput } from '@/base/components/inputs/ThreeStateCheckboxInput.tsx';
import { CheckboxContainer } from '@/base/components/inputs/CheckboxContainer.ts';
import { IncludeOrExclude } from '@/lib/graphql/generated/graphql-base.types.ts';
import {
    booleanToIncludeOrExcludeStatus,
    includeInUpdateStatusToBoolean,
} from '@/features/category/components/CategoryInclusion.utils';
import type {
    CategoryDownloadInclusionInfo,
    CategoryIdInfo,
    CategoryNameInfo,
    CategoryUpdateInclusionInfo,
} from '@/features/category/Category.types.ts';

type CategoryType = CategoryIdInfo & CategoryNameInfo & CategoryUpdateInclusionInfo & CategoryDownloadInclusionInfo;
type CategoryIncludeField = keyof Pick<CategoryType, 'includeInUpdate' | 'includeInDownload'>;

export interface CategorySelectionResult {
    allCategories: CategoryType[];
    included: CategoryType[];
    excluded: CategoryType[];
    unset: CategoryType[];
}

export type CategorySelectionDialogProps = {
    open: boolean;
    categories: CategoryType[];
    includeField: CategoryIncludeField;
    dialogText?: string;
    onClose: () => void;
    onSave: (result: CategorySelectionResult) => void;
};

export const CategorySelectionDialog = ({
    open,
    categories,
    includeField,
    dialogText,
    onClose,
    onSave,
}: CategorySelectionDialogProps) => {
    const { t } = useLingui();
    const [dialogCategories, setDialogCategories] = useState<CategoryType[]>(categories);

    useEffect(() => {
        if (categories) {
            setDialogCategories(categories);
        }
    }, [categories, open]);

    const handleSave = () => {
        const included = dialogCategories.filter((c) => c[includeField] === IncludeOrExclude.Include);
        const excluded = dialogCategories.filter((c) => c[includeField] === IncludeOrExclude.Exclude);
        const unset = dialogCategories.filter((c) => c[includeField] === IncludeOrExclude.Unset);

        onSave({
            allCategories: dialogCategories,
            included,
            excluded,
            unset,
        });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t`Category`}</DialogTitle>
            <DialogContent>
                {dialogText && <DialogContentText sx={{ paddingBottom: '10px' }}>{dialogText}</DialogContentText>}
                <CheckboxContainer>
                    {dialogCategories.map((category, index) => (
                        <ThreeStateCheckboxInput
                            key={category.id}
                            label={category.name}
                            checked={includeInUpdateStatusToBoolean(category[includeField])}
                            onChange={(checked) => {
                                const newIncludeState = booleanToIncludeOrExcludeStatus(checked);
                                const updatedDialogCategories = [...dialogCategories];

                                updatedDialogCategories[index] = {
                                    ...category,
                                    [includeField]: newIncludeState,
                                };

                                setDialogCategories(updatedDialogCategories);
                            }}
                        />
                    ))}
                </CheckboxContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {t`Cancel`}
                </Button>
                <Button onClick={handleSave} color="primary" variant="contained">
                    {t`Save`}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
