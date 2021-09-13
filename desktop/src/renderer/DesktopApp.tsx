import { App } from '@bonp/frontend';
import React, { useEffect } from 'react';
import { addDevice, store } from '@bonp/core';
import { parseDevice } from 'parseDevice/parseDevice';

export const DesktopApp = () => {
  useEffect(() => {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.on('DEVICE_ADDED', (_, arg) => {
      store.dispatch(addDevice(arg));
    });

    ipcRenderer.on('DEVICE_REMOVED', (_, arg) => {
      store.dispatch(addDevice(arg));
    });
  }, []);

  return <App parseDevice={parseDevice} />;
};
