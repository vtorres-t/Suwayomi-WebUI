import type { MessageDescriptor } from '@lingui/core';
import type { ReactNode } from 'react';

export enum GridLayout {
    Compact = 0,
    Comfortable = 1,
    List = 2,
}

export enum DirectionOffset {
    PREVIOUS = -1,
    NEXT = 1,
}

interface DisplayData {
    title: MessageDescriptor | string;
    icon: ReactNode;
}

export type ValueToDisplayData<Value extends string | number> = Record<Value, DisplayData>;

export enum ScrollOffset {
    BACKWARD,
    FORWARD,
}

export enum ScrollDirection {
    X,
    Y,
    XY,
}

export enum SearchParam {
    TAB = 'tab',
    QUERY = 'query',
    REDIRECT = 'redirect',
}
