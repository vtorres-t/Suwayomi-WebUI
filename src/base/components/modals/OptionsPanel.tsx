import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React from 'react';

interface IProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    minHeight?: number;
}

export const OptionsPanel: React.FC<IProps> = ({ open, onClose, children, minHeight }) => (
    <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        slotProps={{
            paper: {
                sx: {
                    maxWidth: 600,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    minHeight,
                },
            },
        }}
    >
        <Box>{children}</Box>
    </Drawer>
);
