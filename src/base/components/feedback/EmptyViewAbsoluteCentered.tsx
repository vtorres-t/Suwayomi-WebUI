import type { EmptyViewProps } from '@/base/components/feedback/EmptyView.tsx';
import { EmptyView } from '@/base/components/feedback/EmptyView.tsx';

export function EmptyViewAbsoluteCentered({ sx, ...emptyViewProps }: EmptyViewProps) {
    return (
        <EmptyView
            {...emptyViewProps}
            sx={{
                position: 'absolute',
                minHeight: 'fill-available',
                ...sx,
            }}
        />
    );
}
