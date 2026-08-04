import type { StackProps } from '@mui/material/Stack';
import Stack from '@mui/material/Stack';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

export const Metadata = ({
    title,
    value,
    stackProps,
    titleProps,
    valueProps,
}: {
    title: string;
    value: ReactNode;
    stackProps?: StackProps;
    titleProps?: TypographyProps;
    valueProps?: TypographyProps;
}) => (
    <Stack
        {...stackProps}
        sx={{ flexDirection: 'row', columnGap: 1, flexWrap: 'wrap', alignItems: 'baseline', ...stackProps?.sx }}
    >
        <Typography
            {...titleProps}
            sx={{
                color: 'text.secondary',
                ...titleProps?.sx,
            }}
        >
            {title}
        </Typography>
        <Typography {...valueProps}>{value}</Typography>
    </Stack>
);
