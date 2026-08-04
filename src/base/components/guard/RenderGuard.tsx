import type { PropsWithChildren } from 'react';

export const RenderGuard = ({ condition, children }: PropsWithChildren<{ condition: boolean }>) =>
    condition ? children : null;
