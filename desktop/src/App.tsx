import { App } from '@bonp/frontend';
import React, { useEffect } from 'react';
import { addDevice, store } from '@bonp/core';
import { ipcRenderer } from 'electron';
import { DEVICE_ADDED, DEVICE_REMOVED } from './DeviceDetector';
import { parseDevice } from './parseDevice/parseDevice';

export default function DesktopApp() {
  useEffect(() => {
    ipcRenderer.on(DEVICE_ADDED, (_, arg) => {
      store.dispatch(addDevice(arg));
    });

    ipcRenderer.on(DEVICE_REMOVED, (_, arg) => {
      store.dispatch(addDevice(arg));
    });
  }, []);

  return <App parseDevice={parseDevice} />;
}
