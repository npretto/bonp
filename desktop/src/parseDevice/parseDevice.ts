import {
  Device,
  DeviceType,
  mapRawKoboToClips,
  parseMyClippingsContents,
  selectKoboCLipsQuery,
} from '@bonp/core';
import { readFileSync } from 'fs';
import SQLite from 'better-sqlite3';

const parseKindle = (device: Device) => {
  const fileContents = readFileSync(device.filePath, {
    encoding: 'utf-8',
  });
  return parseMyClippingsContents(fileContents);
};

const parseKobo = (device: Device) => {
  const db = new SQLite(device.filePath);

  const rows = db.prepare(selectKoboCLipsQuery).all();

  const entries = rows.map(mapRawKoboToClips);

  return entries;
};

export const parseDevice = (device: Device) => {
  switch (device.type) {
    case DeviceType.KINDLE:
      return parseKindle(device);
    case DeviceType.KOBO:
      return parseKobo(device);
    default:
      throw Error('unsupported device type');
  }
};
