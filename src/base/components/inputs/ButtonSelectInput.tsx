import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ComponentProps } from 'react';
import { SelectButton } from '@/base/components/buttons/SelectButton.tsx';

export const ButtonSelectInput = <Value extends string | number, MultiValue extends Value | Value[] = Value>({
    label,
    description,
    ...buttonSelectProps
}: ComponentProps<typeof SelectButton<Value, MultiValue>> & {
    label: string;
    description?: string;
}) => (
    <Stack>
        <Typography>{label}</Typography>
        {description && (
            <Typography variant="body2" color="textDisabled">
                {description}
            </Typography>
        )}
        <SelectButton {...buttonSelectProps} />
    </Stack>
);
