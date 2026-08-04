import { useEffect, useRef } from 'react';
import { useHotkeysContext } from 'react-hotkeys-hook';
import { HotkeyScope } from '@/features/hotkeys/Hotkeys.types.ts';

export const useDisableAllHotkeysWhileMounted = (shouldDisable?: boolean) => {
    const { activeScopes, enableScope, disableScope } = useHotkeysContext();
    const previouslyEnabledScopes = useRef<typeof activeScopes>([]);

    useEffect(() => {
        if (!shouldDisable) {
            return () => {};
        }

        previouslyEnabledScopes.current = [...activeScopes];

        enableScope(HotkeyScope.NONE);
        previouslyEnabledScopes.current.forEach(disableScope);

        return () => {
            disableScope(HotkeyScope.NONE);
            previouslyEnabledScopes.current.forEach(enableScope);
        };
    }, [shouldDisable]);
};
