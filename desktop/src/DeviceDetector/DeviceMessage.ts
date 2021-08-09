import { EReaderDevice } from '@bonp/core';

export const DEVICE_ADDED = 'DEVICE_ADDED';

export type DeviceAdded = {
  type: typeof DEVICE_ADDED;
  device: EReaderDevice;
  devices: EReaderDevice[];
};

export const DEVICE_REMOVED = 'DEVICE_REMOVED';
export type DeviceRemoved = {
  type: typeof DEVICE_REMOVED;
  device: EReaderDevice;
  devices: EReaderDevice[];
};
