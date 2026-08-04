import Typography from '@mui/material/Typography';
import React from 'react';

interface Props {
    name: string;
}

export const HeaderFilter: React.FC<Props> = ({ name }) => (
    <Typography key={name} sx={{ mt: 2 }} variant="subtitle2">
        {name}
    </Typography>
);
