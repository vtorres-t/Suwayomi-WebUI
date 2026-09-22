import type { CardContentProps } from '@mui/material/CardContent';
import CardContent from '@mui/material/CardContent';
import { MUIUtil } from '@/lib/mui/MUI.util.ts';

export const ListCardContent = ({ children, ...props }: CardContentProps) => (
    <CardContent
        {...props}
        sx={MUIUtil.mergeSx(
            {
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                '&:last-child': {
                    paddingBottom: 1,
                },
            },
            props.sx,
        )}
    >
        {children}
    </CardContent>
);
