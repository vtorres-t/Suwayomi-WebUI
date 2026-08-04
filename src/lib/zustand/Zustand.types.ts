import type { StateCreator as ZustandStateCreator } from 'zustand';

export type StateCreator<T> = ZustandStateCreator<T, [['zustand/devtools', never], ['zustand/immer', never]], [], T>;

export type SliceCreator<T> = (
    actionNameCreator: (...names: string[]) => string,
    ...args: Parameters<StateCreator<T>>
) => T;
