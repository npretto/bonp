export enum EreaderDeviceType {
  KINDLE = "KINDLE",
  KOBO = "KOBO",
}

export type EReaderDevice = {
  path: string;
  type: EreaderDeviceType;
  filePath: string;
};
