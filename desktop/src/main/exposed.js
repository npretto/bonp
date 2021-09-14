const { ipcRenderer } = require('electron');

exports.exposed = {
  onDeviceAdded: (cb) => ipcRenderer.on('DEVICE_ADDED', cb),
  onDeviceRemoved: (cb) => ipcRenderer.on('DEVICE_REMOVED', cb),
  parseDevice: (device) =>
    new Promise((resolve, reject) => {
      ipcRenderer.send('PARSE_DEVICE', device);
      ipcRenderer.on('DEVICE_PARSED', (e, arg) => {
        resolve(arg);
      });
    }),
};
