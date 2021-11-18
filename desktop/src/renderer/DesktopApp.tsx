import { addDevice, removeDevice, store } from '@bonp/core';
import { App } from '@bonp/frontend';
import { exposed } from 'main/exposed';
import React, { useEffect } from 'react';

const w = window as typeof window & { exposed: typeof exposed };
export const DesktopApp = () => {
  useEffect(() => {
    w.exposed.onDeviceAdded((_: any, arg: any) => {
      store.dispatch(addDevice(arg));
    });

    w.exposed.onDeviceRemoved((_: any, arg: any) => {
      store.dispatch(removeDevice(arg));
    });
  });

  return <App parseDevice={w.exposed.parseDevice} />;
};
