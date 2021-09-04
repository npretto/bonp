export enum DeviceType {
  KINDLE = "KINDLE",
  KOBO = "KOBO",
}

export type Device = {
  path: string;
  type: DeviceType;
  filePath: string;
};
