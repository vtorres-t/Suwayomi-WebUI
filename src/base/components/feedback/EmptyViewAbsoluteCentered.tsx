import type { EmptyViewProps } from '@/base/components/feedback/EmptyView.tsx';
import { EmptyView } from '@/base/components/feedback/EmptyView.tsx';
import { MUIUtil } from '@/lib/mui/MUI.util.ts';

export function EmptyViewAbsoluteCentered({ sx, ...emptyViewProps }: EmptyViewProps) {
    return (
        <EmptyView
            {...emptyViewProps}
            sx={MUIUtil.mergeSx(
                {
                    position: 'absolute',
                    minHeight: 'fill-available',
                },
                sx,
            )}
        />
    );
}
