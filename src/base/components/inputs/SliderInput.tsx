import type { SliderProps } from '@mui/material/Slider';
import Slider from '@mui/material/Slider';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { ResetButton } from '@/base/components/buttons/ResetButton.tsx';
import { MUIUtil } from '@/lib/mui/MUI.util.ts';

export const SliderInput = ({
    label,
    value,
    onDefault,
    slotProps,
}: {
    label: string;
    value: number | string;
    onDefault?: () => void;
    slotProps?: {
        label?: TypographyProps;
        value?: TypographyProps;
        slider?: SliderProps;
    };
}) => (
    <Stack sx={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
        <Stack sx={{ flexBasis: '25%' }}>
            <Typography {...slotProps?.label} sx={slotProps?.label?.sx}>
                {label}
            </Typography>
            <Typography {...slotProps?.value} sx={slotProps?.value?.sx}>
                {value}
            </Typography>
        </Stack>
        <Slider {...slotProps?.slider} sx={MUIUtil.mergeSx({ flexBasis: '75%' }, slotProps?.slider?.sx)} />
        {onDefault && <ResetButton asIconButton onClick={onDefault} />}
    </Stack>
);
