import { Device } from '@bonp/core';

export const DEVICE_ADDED = 'DEVICE_ADDED';

export type DeviceAdded = {
  type: typeof DEVICE_ADDED;
  device: Device;
  devices: Device[];
};

export const DEVICE_REMOVED = 'DEVICE_REMOVED';
export type DeviceRemoved = {
  type: typeof DEVICE_REMOVED;
  device: Device;
  devices: Device[];
};
