/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import FilterList from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { useLingui } from '@lingui/react/macro';
import { CustomTooltip } from '@/base/components/CustomTooltip.tsx';
import { LibraryOptionsPanel } from '@/features/library/components/LibraryOptionsPanel.tsx';
import { getCategoryMetadata } from '@/features/category/services/CategoryMetadata.ts';

export const LibraryToolbarMenu = ({
    category,
    uniqueSources,
    selectedSource,
    onSourceChange,
}: {
    category: ComponentProps<typeof LibraryOptionsPanel>['category'];
    uniqueSources: Array<{ id: string; name: string; displayName?: string }>;
    selectedSource: string | null | undefined;
    onSourceChange: (sourceId: string | undefined) => void;
}) => {
    const { t } = useLingui();

    const [open, setOpen] = useState(false);
    const options = getCategoryMetadata(category);
    const isSourceFilterActive = !!selectedSource;
    const active =
        options.hasDownloadedChapters != null ||
        options.hasUnreadChapters != null ||
        options.hasReadChapters != null ||
        options.hasBookmarkedChapters != null ||
        options.hasDuplicateChapters != null ||
        Object.values(options.hasStatus).some((hasStatus) => hasStatus != null) ||
        Object.values(options.hasTrackerBinding).some((trackerFilterStatus) => trackerFilterStatus != null) ||
        isSourceFilterActive;
    return (
        <>
            <CustomTooltip title={t`Settings`}>
                <IconButton onClick={() => setOpen(!open)} color={active ? 'warning' : 'inherit'}>
                    <FilterList />
                </IconButton>
            </CustomTooltip>
            <LibraryOptionsPanel
                category={category}
                open={open}
                onClose={() => setOpen(false)}
                uniqueSources={uniqueSources}
                selectedSource={selectedSource}
                onSourceChange={onSourceChange}
            />
        </>
    );
};
