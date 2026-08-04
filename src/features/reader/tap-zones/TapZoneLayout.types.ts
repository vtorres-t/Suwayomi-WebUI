export enum TapZoneLayouts {
    EDGE,
    KINDLE,
    L_SHAPE,
    RIGHT_LEFT,
    DISABLED,
}

export enum TapZoneRegionType {
    MENU,
    PREVIOUS,
    NEXT,
}

/**
 * percentage based values
 */
export type ReaderTapZoneRect = [X: number, Y: number, Width: number, Height: number];

export interface TapZoneRegion {
    rect: ReaderTapZoneRect;
    type: TapZoneRegionType;
}

export interface TapZoneInvertMode {
    vertical: boolean;
    horizontal: boolean;
}

export type TReaderTapZoneContext = {
    showPreview: boolean;
    setShowPreview: (showPreview: boolean) => void;
};
