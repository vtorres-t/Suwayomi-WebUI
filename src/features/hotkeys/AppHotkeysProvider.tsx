import { HotkeysProvider } from 'react-hotkeys-hook';
import type { ReactNode } from 'react';
import { HotkeyScope } from '@/features/hotkeys/Hotkeys.types.ts';

export const AppHotkeysProvider = ({ children }: { children?: ReactNode }) => (
    <HotkeysProvider initiallyActiveScopes={[HotkeyScope.GLOBAL]}>{children}</HotkeysProvider>
);
