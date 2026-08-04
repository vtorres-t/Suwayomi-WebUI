import { DragOverlay } from '@dnd-kit/core';
import type { ReactNode } from 'react';

export const DndOverlayItem = ({ isActive, children }: { isActive: boolean; children?: ReactNode }) => {
    if (!isActive) {
        return null;
    }

    return <DragOverlay style={{ cursor: 'grabbing' }}>{children}</DragOverlay>;
};
