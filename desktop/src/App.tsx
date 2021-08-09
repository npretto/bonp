import { App } from '@bonp/frontend';
import React from 'react';
import './App.global.css';
import { useDevices } from './DeviceDetector';

export default function DesktopApp() {
  return <App useDevices={useDevices} />;
}
