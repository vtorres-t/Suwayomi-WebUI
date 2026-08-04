import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { memo } from 'react';
import { useLingui } from '@lingui/react/macro';
import { CustomTooltip } from '@/base/components/CustomTooltip.tsx';
import { useGetOptionForDirection } from '@/features/theme/services/ThemeCreator.ts';
import { withPropsFrom } from '@/base/hoc/withPropsFrom.tsx';
import { ReaderService } from '@/features/reader/services/ReaderService.ts';

const BaseReaderExitButton = ({ exit }: { exit: ReturnType<typeof ReaderService.useExit> }) => {
    const { t } = useLingui();
    const getOptionForDirection = useGetOptionForDirection();

    return (
        <CustomTooltip title={t`Exit reader`}>
            <IconButton sx={{ marginRight: 2 }} onClick={exit} color="inherit">
                {getOptionForDirection(<ArrowBack />, <ArrowForwardIcon />)}
            </IconButton>
        </CustomTooltip>
    );
};

export const ReaderExitButton = withPropsFrom(
    memo(BaseReaderExitButton),
    [() => ({ exit: ReaderService.useExit() })],
    ['exit'],
);
