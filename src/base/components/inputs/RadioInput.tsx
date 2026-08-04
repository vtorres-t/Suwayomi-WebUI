import FormControlLabel from '@mui/material/FormControlLabel';
import type { RadioProps } from '@mui/material/Radio';
import Radio from '@mui/material/Radio';
import React from 'react';

export interface RadioInputProps extends RadioProps {
    label?: string;
}

export const RadioInput: React.FC<RadioInputProps> = ({ label, sx, ...rest }) => (
    <FormControlLabel control={<Radio {...rest} />} label={label} sx={sx} />
);
