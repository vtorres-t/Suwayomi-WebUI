import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import { MUIUtil } from '@/lib/mui/MUI.util.ts';

export const CustomIconButton = <C extends React.ElementType>({
    children,
    ...props
}: ButtonProps<C, { component?: C }>) => (
    <Button
        {...props}
        sx={MUIUtil.mergeSx(
            {
                minWidth: 'unset',
                px: '10px',
            },
            props.sx,
        )}
    >
        {children}
    </Button>
);
