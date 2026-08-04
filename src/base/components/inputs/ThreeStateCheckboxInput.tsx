import FormControlLabel from '@mui/material/FormControlLabel';
import React from 'react';
import type { ThreeStateCheckboxProps } from '@/base/components/inputs/ThreeStateCheckbox.tsx';
import { ThreeStateCheckbox } from '@/base/components/inputs/ThreeStateCheckbox.tsx';

interface IProps extends ThreeStateCheckboxProps {
    label?: string;
}

export const ThreeStateCheckboxInput: React.FC<IProps> = ({ label, sx, ...rest }) => (
    <FormControlLabel control={<ThreeStateCheckbox {...rest} />} label={label} sx={sx} />
);
