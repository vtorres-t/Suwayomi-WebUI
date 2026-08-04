import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { memo } from 'react';
import type { RadioInputProps } from '@/base/components/inputs/RadioInput.tsx';
import { RadioInput } from '@/base/components/inputs/RadioInput.tsx';

interface IProps extends RadioInputProps {
    sortDescending?: boolean | null | undefined;
}

export const SortRadioInput = memo(({ sortDescending, checkedIcon, ...rest }: IProps) => (
    <RadioInput
        {...rest}
        checkedIcon={
            checkedIcon ?? (sortDescending ? <ArrowDownward color="primary" /> : <ArrowUpward color="primary" />)
        }
    />
));
