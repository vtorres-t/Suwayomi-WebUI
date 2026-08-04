import type { PropsWithChildren } from 'react';
import { RenderGuard } from '@/base/components/guard/RenderGuard.tsx';

export const ShareGuard = ({ children }: PropsWithChildren) => (
    <RenderGuard condition={!!navigator.share}>{children}</RenderGuard>
);
