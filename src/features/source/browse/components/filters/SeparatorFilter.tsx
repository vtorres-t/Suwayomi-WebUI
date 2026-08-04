import Divider from '@mui/material/Divider';
import React from 'react';

interface Props {
    name: string;
}

export const SeparatorFilter: React.FC<Props> = ({ name }) => (
    <Divider key={name} sx={{ my: 1 }} textAlign="center">
        {name}
    </Divider>
);
