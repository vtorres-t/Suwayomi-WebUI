import type { TooltipProps } from '@mui/material/Tooltip';
import Tooltip from '@mui/material/Tooltip';

export const CustomTooltip = ({
    children,
    disabled = false,
    title,
    ...props
}: TooltipProps & { disabled?: boolean }) => (
    <Tooltip {...props} title={disabled ? '' : title}>
        {children}
    </Tooltip>
);
