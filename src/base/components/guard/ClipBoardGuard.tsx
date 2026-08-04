import type { PropsWithChildren } from 'react';
import { RenderGuard } from '@/base/components/guard/RenderGuard.tsx';

export const ClipBoardGuard = ({ children }: PropsWithChildren) => (
    <RenderGuard condition={!!navigator.clipboard}>{children}</RenderGuard>
);
