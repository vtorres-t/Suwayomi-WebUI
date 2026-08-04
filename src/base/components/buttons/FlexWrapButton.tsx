import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const FlexWrapButton = <C extends React.ElementType>({
    children,
    ...props
}: ButtonProps<C, { component?: C }>) => (
    <Button {...props}>
        <Stack
            direction="row"
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                flexWrap: 'wrap',
            }}
        >
            {children}
        </Stack>
    </Button>
);
