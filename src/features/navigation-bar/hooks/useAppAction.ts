import { useEffect } from 'react';
import { useNavBarContext } from '@/features/navigation-bar/NavbarContext.tsx';
import type { NavbarContextType } from '@/features/navigation-bar/NavigationBar.types.ts';
import { STABLE_EMPTY_ARRAY } from '@/base/Base.constants.ts';

export const useAppAction = (action: NavbarContextType['action'], dependencies: any[] = STABLE_EMPTY_ARRAY) => {
    const { setAction } = useNavBarContext();

    useEffect(() => {
        setAction(action);
        return () => setAction(null);
    }, dependencies);
};
