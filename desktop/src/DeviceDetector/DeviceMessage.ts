import { EReader } from './';

export const DEVICE_ADDED = 'DEVICE_ADDED';

export type DeviceAdded = {
  type: typeof DEVICE_ADDED;
  device: EReader;
  devices: EReader[];
};

export const DEVICE_REMOVED = 'DEVICE_REMOVED';
export type DeviceRemoved = {
  type: typeof DEVICE_REMOVED;
  device: EReader;
  devices: EReader[];
};
