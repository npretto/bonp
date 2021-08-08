import * as drivelist from 'drivelist';
import fs from 'fs';
import usbDetect from 'usb-detection';
import std_path from 'path';
import { partition } from 'ramda';

export enum EReaderType {
  KINDLE = 'KINDLE',
  KOBO = 'KOBO',
}

export type EReader = {
  path: string;
  type: EReaderType;
  filePath: string;
};

class DeviceDetector {
  public devices: EReader[] = [];

  onAdd?: (e: EReader) => void = undefined;
  onRemove?: (e: EReader) => void = undefined;

  public startMonitoring = (
    onAdd: (e: EReader) => void,
    onRemove: (e: EReader) => void
  ): EReader[] => {
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

    const isDevice = (v: boolean | EReader): v is EReader => Boolean(v);

    const added = usbDrives
      .map((d) => d.mountpoints[0].path)
      .filter((path) => !this.devices.map(({ path }) => path).includes(path))
      .map(this.identifyDevice)
      .filter(isDevice);

    this.devices = [...this.devices, ...added];

    added.length && this.onAdd && added.forEach(this.onAdd);
  };

  checkForRemovedDevices = async () => {
    const usbDrives = await this.getusbDrives();

    const paths = usbDrives.map((d) => d.mountpoints[0].path);

    const [left, removed] = partition((d: EReader) => paths.includes(d.path))(
      this.devices
    );

    this.devices = left;

    removed.length && this.onAdd && removed.forEach(this.onAdd);
  };

  identifyDevice = (path: string): EReader | false => {
    if (fs.existsSync(std_path.join(path, 'Documents/My Clippings.txt')))
      return {
        type: EReaderType.KINDLE,
        path,
        filePath: std_path.join(path, 'Documents/My Clippings.txt'),
      };
    if (fs.existsSync(std_path.join(path, '.kobo')))
      return {
        type: EReaderType.KOBO,
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
