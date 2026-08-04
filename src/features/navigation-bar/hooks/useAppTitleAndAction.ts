import type { NavbarContextType } from '@/features/navigation-bar/NavigationBar.types.ts';
import { useAppTitle } from '@/features/navigation-bar/hooks/useAppTitle.ts';
import { useAppAction } from '@/features/navigation-bar/hooks/useAppAction.ts';

export const useAppTitleAndAction = (
    title: NavbarContextType['title'],
    action: NavbarContextType['action'],
    actionDependencies?: any[],
) => {
    useAppTitle(title);
    useAppAction(action, actionDependencies);
};
