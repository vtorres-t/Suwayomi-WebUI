import type { BoxProps } from '@mui/material/Box';
import type { TooltipProps } from '@mui/material/Tooltip';
import type { IReaderSettings, PageData } from '@/features/reader/Reader.types.ts';

export type ReaderProgressBarProps = Pick<IReaderSettings, 'progressBarPosition'>;

export interface TReaderProgressCurrentPage extends PageData {
    pagesIndex: number;
}

export interface ReaderProgressBarSlotProps extends Pick<IReaderSettings, 'progressBarPosition'> {
    pageName: string;
    slotProps?: {
        box?: BoxProps;
        tooltip?: Omit<TooltipProps, 'title' | 'children'>;
    };
}

export interface CurrentPageSlotProps extends Pick<IReaderSettings, 'progressBarPosition'> {
    pageName: string;
    currentPagesIndex: number;
    pagesLength: number;
    isDragging: boolean;
    boxProps?: BoxProps;
}

export type TReaderProgressBarContext = {
    isMaximized: boolean;
    setIsMaximized: (visible: boolean) => void;
    isDragging: boolean;
    setIsDragging: (isDragging: boolean) => void;
};
