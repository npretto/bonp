import { App } from '@bonp/frontend';
import React from 'react';
import './App.global.css';
import { useDevices } from './DeviceDetector';

export default function DesktopApp() {
  const devices = useDevices();

  return (
    <div>
      <p>devices:</p>
      <ul>
        {devices.map((device, i) => (
          <li key={i}>
            {device.type} at {device.path}
          </li>
        ))}
      </ul>
      <App />
    </div>
  );
}
