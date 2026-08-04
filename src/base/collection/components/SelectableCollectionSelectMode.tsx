import Checkbox from '@mui/material/Checkbox';
import ClearIcon from '@mui/icons-material/Clear';
import { useLingui } from '@lingui/react/macro';
import { CustomTooltip } from '@/base/components/CustomTooltip.tsx';
import { SelectableCollectionSelectAll } from '@/base/collection/components/SelectableCollectionSelectAll.tsx';

export const SelectableCollectionSelectMode = ({
    isActive,
    areAllItemsSelected,
    areNoItemsSelected,
    onSelectAll,
    onModeChange,
    isCancelable = true,
}: {
    isActive: boolean;
    areAllItemsSelected: boolean;
    areNoItemsSelected: boolean;
    onSelectAll: (selectAll: boolean) => void;
    onModeChange: (checked: boolean) => void;
    isCancelable?: boolean;
}) => {
    const { t } = useLingui();

    return (
        <>
            {isActive && (
                <SelectableCollectionSelectAll
                    areAllItemsSelected={areAllItemsSelected}
                    areNoItemsSelected={areNoItemsSelected}
                    onChange={onSelectAll}
                />
            )}
            {isCancelable && (
                <CustomTooltip title={!isActive ? t`Select all` : t`Cancel`}>
                    <Checkbox
                        checkedIcon={<ClearIcon />}
                        sx={{
                            padding: '8px',
                            color: 'inherit',
                            '&.Mui-checked': {
                                color: 'inherit',
                            },
                        }}
                        checked={isActive}
                        onChange={(_, checked) => onModeChange(checked)}
                    />
                </CustomTooltip>
            )}
        </>
    );
};
