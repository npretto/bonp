const { contextBridge } = require('electron');
const { exposed } = require('./exposed');

contextBridge.exposeInMainWorld('exposed', exposed);
