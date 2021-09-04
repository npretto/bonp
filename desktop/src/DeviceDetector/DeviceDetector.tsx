import * as drivelist from 'drivelist';
import fs from 'fs';
import usbDetect from 'usb-detection';
import std_path from 'path';
import { partition } from 'ramda';
import { Device, DeviceType } from '@bonp/core';

class DeviceDetector {
  public devices: Device[] = [];

  // TODO: should find a better event api
  onAdd?: (d: Device, devices: Device[]) => void = undefined;

  onRemove?: (d: Device, devices: Device[]) => void = undefined;

  public startMonitoring = (
    onAdd: (d: Device, devices: Device[]) => void,
    onRemove: (d: Device, devices: Device[]) => void
  ): Device[] => {
    this.onAdd = onAdd;
    this.onRemove = onRemove;
    usbDetect.startMonitoring();

    this.checkForNewDevices();

    // what's up with all those setTimeouts?
    // i'm using drivelist to get the list of the connected drives
    // and usb-detection to get a ping when a new device is connected
    // the two libraries are independent and from my testing drivelist doesn't see the devices
    // as fast as usb-detection so i'm using `usb-detection` events as guidelines to just avoid polling too much

    usbDetect.on('add', () => {
      setTimeout(this.checkForNewDevices, 500);
      setTimeout(this.checkForNewDevices, 1000);
      setTimeout(this.checkForNewDevices, 2500);
      setTimeout(this.checkForNewDevices, 5000);
    });

    usbDetect.on('remove', () => {
      setTimeout(this.checkForRemovedDevices, 500);
      setTimeout(this.checkForRemovedDevices, 1000);
      setTimeout(this.checkForRemovedDevices, 2500);
      setTimeout(this.checkForRemovedDevices, 5000);
    });

    return this.devices;
  };

  checkForNewDevices = async () => {
    const usbDrives = await this.getusbDrives();

    const isDevice = (v: boolean | Device): v is Device => Boolean(v);

    const added = usbDrives
      .map((d) => d.mountpoints[0].path)
      .filter((p) => !this.devices.map(({ path }) => path).includes(p))
      .map(this.identifyDevice)
      .filter(isDevice);

    this.devices = [...this.devices, ...added];

    if (added.length && this.onAdd) {
      added.forEach((d) => this.onAdd && this.onAdd(d, this.devices));
    }
  };

  checkForRemovedDevices = async () => {
    const usbDrives = await this.getusbDrives();

    const paths = usbDrives.map((d) => d.mountpoints[0].path);

    const [left, removed] = partition((d: Device) => paths.includes(d.path))(
      this.devices
    );

    this.devices = left;

    if (removed.length && this.onAdd) {
      removed.forEach((d) => this.onAdd && this.onAdd(d, this.devices));
    }
  };

  identifyDevice = (path: string): Device | false => {
    if (fs.existsSync(std_path.join(path, 'Documents/My Clippings.txt')))
      return {
        type: DeviceType.KINDLE,
        path,
        filePath: std_path.join(path, 'Documents/My Clippings.txt'),
      };
    if (fs.existsSync(std_path.join(path, '.kobo')))
      return {
        type: DeviceType.KOBO,
        path,
        filePath: std_path.join(path, '.kobo/KoboReader.sqlite'),
      };

    return false;
  };

  private getusbDrives = async (): Promise<drivelist.Drive[]> => {
    const drives = await drivelist.list();
    return drives
      .filter((d) => d.isUSB) // filter for usb
      .filter((d) => !d.size || d?.size <= 100_000_000_000) // filter for size, i don't think there are ereaders with more than 100gb of memory
      .filter((d) => d.mountpoints.length); // sometimes they appear without a mountpoint for a moment, I want to skip them and wait
  };
}

export { DeviceDetector };
