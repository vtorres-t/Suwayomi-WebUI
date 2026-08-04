import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { memo } from 'react';

export const StyledGroupItemWrapper = memo(
    styled(Box)(({ theme }) => ({
        padding: theme.spacing(0, 1, 1, 1),
    })),
);
