import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';

export const MigrationEntryCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.palette.divider,
}));
