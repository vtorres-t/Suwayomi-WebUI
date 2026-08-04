import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

export const MigrationEntryCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    '&:last-child': {
        paddingBottom: theme.spacing(2),
    },
}));
