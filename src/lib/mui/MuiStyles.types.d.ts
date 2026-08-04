import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface CssThemeVariables {
        enabled: true;
    }

    // Re-exported here because MUI doesn't include PaletteBackgroundChannel in its public API surface.
    // Defined in @mui/material/esm/styles/createThemeFoundation.d.ts
    export interface PaletteBackgroundChannel {
        defaultChannel: string;
        paperChannel: string;
    }
}
