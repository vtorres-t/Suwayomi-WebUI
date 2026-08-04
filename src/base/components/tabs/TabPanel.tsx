import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import React from 'react';

interface IProps extends BoxProps {
    children: React.ReactNode;
    index: any;
    currentIndex: any;
}

export function TabPanel(props: IProps) {
    const { children, index, currentIndex, ...boxProps } = props;

    return (
        <Box {...boxProps} role="tabpanel" hidden={index !== currentIndex} id={`simple-tabpanel-${index}`}>
            {currentIndex === index && children}
        </Box>
    );
}
