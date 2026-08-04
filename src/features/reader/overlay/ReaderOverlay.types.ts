export interface BaseReaderOverlayProps {
    isVisible: boolean;
}

export type MobileHeaderProps = BaseReaderOverlayProps;

interface ReaderNavBarBaseProps extends BaseReaderOverlayProps {
    openSettings: () => void;
}

export type ReaderBottomBarMobileProps = ReaderNavBarBaseProps;

export type ReaderNavBarDesktopProps = ReaderNavBarBaseProps;
