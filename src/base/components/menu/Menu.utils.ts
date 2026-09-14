import type { MessageDescriptor } from '@lingui/core';
import { t } from '@lingui/core/macro';

export const createGetMenuItemTitle =
    <Action extends string>(
        isSingleMode: boolean,
        actionToTranslation: Record<
            Action,
            {
                action: {
                    single: MessageDescriptor;
                    selected: MessageDescriptor;
                };
                success: MessageDescriptor;
                error: MessageDescriptor;
            }
        >,
    ) =>
    (action: Action, count: number): string => {
        const countSuffix = count > 0 ? ` (${count})` : '';
        return `${t(actionToTranslation[action].action[isSingleMode ? 'single' : 'selected'])}${countSuffix}`;
    };

export const createShouldShowMenuItem =
    (isSingleMode: boolean) =>
    (shouldBeVisible: boolean = false): boolean =>
        isSingleMode ? shouldBeVisible : true;

export const createIsMenuItemDisabled =
    (isSingleMode: boolean) =>
    (shouldBeDisabled: boolean): boolean =>
        isSingleMode ? false : shouldBeDisabled;
