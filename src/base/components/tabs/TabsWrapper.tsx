import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';

export const TabsWrapper = ({ children, ...props }: BoxProps) => (
    <Box {...props} sx={{ ...props.sx, position: 'relative', height: `100%` }}>
        {children}
    </Box>
);
