import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { DEVICE_ADDED, DEVICE_REMOVED, EReader } from './';

export const useDevices = () => {
  const [devices, setDevices] = useState<EReader[]>([]);

  useEffect(() => {
    ipcRenderer.on(DEVICE_ADDED, (e, arg) => {
      console.log(arg.devices);
      setDevices(arg.devices);
    });

    ipcRenderer.on(DEVICE_REMOVED, (e, arg) => {
      setDevices(arg.devices);
    });
  }, [setDevices]);

  return devices;
};
