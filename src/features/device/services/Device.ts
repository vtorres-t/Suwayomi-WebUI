export const DEFAULT_DEVICE = 'default';

let activeDevice = DEFAULT_DEVICE;
export const getActiveDevice = (): string => activeDevice;
export const setActiveDevice = (device: string) => {
    activeDevice = device;
};
