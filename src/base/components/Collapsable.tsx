import type { CollapseProps } from '@mui/material/Collapse';
import Collapse from '@mui/material/Collapse';
import type { StackProps } from '@mui/material/Stack';
import Stack from '@mui/material/Stack';
import type { ReactNode } from 'react';
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export const Collapsable = ({
    header,
    collapse,
    initialState,
    slots,
}: {
    header: ReactNode;
    collapse: ReactNode;
    initialState?: boolean;
    slots?: {
        headerWrapper?: StackProps;
        collapse?: CollapseProps;
    };
}) => {
    const [isOpen, setIsOpen] = useState(initialState);

    return (
        <>
            <Stack
                {...slots?.headerWrapper}
                sx={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    gap: 1,
                    cursor: 'pointer',
                    ...slots?.headerWrapper?.sx,
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {header}
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </Stack>
            <Collapse
                {...slots?.collapse}
                slotProps={{
                    ...slots?.collapse?.slotProps,
                    wrapperInner: (ownerState) => {
                        const wrapperInner = slots?.collapse?.slotProps?.wrapperInner;
                        const wrapperInnerProps =
                            typeof wrapperInner === 'function' ? wrapperInner(ownerState) : wrapperInner;

                        return {
                            ...wrapperInnerProps,
                            sx: {
                                display: 'flex',
                                flexDirection: 'column',
                                ...wrapperInnerProps?.sx,
                            },
                        };
                    },
                }}
                in={isOpen}
            >
                {collapse}
            </Collapse>
        </>
    );
};
