import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';

export const CustomIconButton = <C extends React.ElementType>({
    children,
    ...props
}: ButtonProps<C, { component?: C }>) => (
    <Button
        {...props}
        sx={{
            minWidth: 'unset',
            px: '10px',
            ...props.sx,
        }}
    >
        {children}
    </Button>
);
