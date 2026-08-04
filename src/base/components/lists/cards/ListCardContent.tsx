import type { CardContentProps } from '@mui/material/CardContent';
import CardContent from '@mui/material/CardContent';

export const ListCardContent = ({ children, ...props }: CardContentProps) => (
    <CardContent
        {...props}
        sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 1,
            '&:last-child': {
                paddingBottom: 1,
            },
            ...props.sx,
        }}
    >
        {children}
    </CardContent>
);
