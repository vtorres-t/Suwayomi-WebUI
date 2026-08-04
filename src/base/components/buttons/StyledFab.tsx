import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';

export const DEFAULT_FAB_STYLE = {
    position: 'fixed',
    height: '48px',
    right: '48px',
    bottom: '28px',
} as const;

export const DEFAULT_FULL_FAB_HEIGHT = `calc(${DEFAULT_FAB_STYLE.bottom} + ${DEFAULT_FAB_STYLE.height})`;

export const StyledFab = styled(Fab)({
    ...DEFAULT_FAB_STYLE,
}) as typeof Fab;
