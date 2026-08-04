import { HotkeyScope } from '@/features/hotkeys/Hotkeys.types.ts';

export const HOTKEY_SCOPES = Object.fromEntries(
    Object.values(HotkeyScope).map((scope) => [scope, { scopes: scope }]),
) as Record<HotkeyScope, { scopes: string }>;
