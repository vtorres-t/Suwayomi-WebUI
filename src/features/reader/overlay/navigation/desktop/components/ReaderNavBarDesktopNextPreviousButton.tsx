import type { ComponentProps } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { CustomTooltip } from '@/base/components/CustomTooltip.tsx';
import { CustomIconButton } from '@/base/components/buttons/CustomIconButton.tsx';

export const ReaderNavBarDesktopNextPreviousButton = ({
    title,
    type,
    disabled,
    ...customIconButtonProps
}: Omit<ComponentProps<typeof CustomIconButton>, 'children'> & {
    title: string;
    type: 'previous' | 'next';
}) => (
    <CustomTooltip title={title} disabled={disabled}>
        <CustomIconButton sx={{ flexBasis: '15%' }} variant="contained" disabled={disabled} {...customIconButtonProps}>
            {type === 'previous' ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
        </CustomIconButton>
    </CustomTooltip>
);
