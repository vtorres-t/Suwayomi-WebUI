import Box from '@mui/material/Box';
import { useSortable } from '@dnd-kit/sortable';
import type { ReactNode } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { applyStyles } from '@/base/utils/ApplyStyles.ts';

export const DndSortableItem = ({
    id,
    isDragging = false,
    children,
}: {
    id: UniqueIdentifier;
    isDragging?: boolean;
    children: ReactNode;
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    return (
        <Box
            ref={setNodeRef}
            sx={{
                transform: CSS.Translate.toString(transform),
                transition,
                ...applyStyles(isDragging, {
                    opacity: 0.25,
                }),
            }}
            {...attributes}
            {...listeners}
        >
            {children}
        </Box>
    );
};
