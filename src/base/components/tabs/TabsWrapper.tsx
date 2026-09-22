import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import { MUIUtil } from '@/lib/mui/MUI.util.ts';

export const TabsWrapper = ({ children, ...props }: BoxProps) => (
    <Box {...props} sx={MUIUtil.mergeSx(props.sx, { position: 'relative', height: `100%` })}>
        {children}
    </Box>
);
