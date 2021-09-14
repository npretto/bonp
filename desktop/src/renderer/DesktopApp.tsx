import { App } from '@bonp/frontend';
import React, { useEffect } from 'react';
import { addDevice, Clip, Device, removeDevice, store } from '@bonp/core';
import { exposed } from 'main/exposed';

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
