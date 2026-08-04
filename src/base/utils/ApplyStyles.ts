import type { Theme } from '@mui/material/styles';

// use CSSObject instead of SxProps<Theme> because this completely fucks over typescript by causing an out of memory error during compilation
type CSSObject = ReturnType<Theme['applyStyles']>;

const emptyStyle = {};
export const applyStyles = (isActive: boolean, styling: CSSObject): CSSObject => (isActive ? styling : emptyStyle);
