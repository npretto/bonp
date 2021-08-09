import { EReaderDevice } from '@bonp/core';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { DEVICE_ADDED, DEVICE_REMOVED } from './DeviceMessage';

// TODO: put this on redux and not in state, rename to "useDeviceDetector"
export const useDevices = () => {
  const [devices, setDevices] = useState<EReaderDevice[]>([]);

  useEffect(() => {
    ipcRenderer.on(DEVICE_ADDED, (_, arg) => {
      setDevices(arg.devices);
    });

    ipcRenderer.on(DEVICE_REMOVED, (_, arg) => {
      setDevices(arg.devices);
    });
  }, [setDevices]);

  return devices;
};
