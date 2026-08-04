import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

export const ReaderProgressBarRoot = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(0.5),
}));
