import type { ReactNode } from 'react';
import React, { useContext, useMemo } from 'react';
import { DEFAULT_DEVICE, setActiveDevice } from '@/features/device/services/Device.ts';
import { useLocalStorage } from '@/base/hooks/useStorage.tsx';

export const DeviceContext = React.createContext<{
    activeDevice: string;
    setActiveDevice: (device: string) => void;
}>({
    activeDevice: DEFAULT_DEVICE,
    setActiveDevice: () => {},
});

export const ActiveDeviceContextProvider = ({ children }: { children?: ReactNode }) => {
    const [activeDevice, setActiveDeviceContext] = useLocalStorage('activeDevice', DEFAULT_DEVICE);
    const activeDeviceContext = useMemo(
        () => ({ activeDevice, setActiveDevice: setActiveDeviceContext }),
        [activeDevice],
    );

    setActiveDevice(activeDevice);

    return <DeviceContext.Provider value={activeDeviceContext}>{children}</DeviceContext.Provider>;
};

export const useDeviceContext = () => useContext(DeviceContext);
