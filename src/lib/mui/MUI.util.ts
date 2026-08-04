import type { BaseSyntheticEvent } from 'react';
import React from 'react';
import { chainEventHandlers } from 'material-ui-popup-state/chainEventHandlers';

export class MUIUtil {
    static preventRipple(): (e: BaseSyntheticEvent) => void {
        return (e) => e.stopPropagation();
    }

    static preventRippleProp<T extends Record<string, unknown>[]>(
        ...handlers: T
    ): T & Pick<React.DOMAttributes<unknown>, 'onMouseDown' | 'onTouchStart'> {
        return chainEventHandlers(handlers[0], ...handlers.slice(1), {
            onMouseDown: MUIUtil.preventRipple(),
            onTouchStart: MUIUtil.preventRipple(),
        }) as T & Pick<React.DOMAttributes<unknown>, 'onMouseDown' | 'onTouchStart'>;
    }
}
