import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      const validChannels = ['Python_toggleScript'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes sender
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: string, func: (arg0: any) => void) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes sender
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },

    togglePythonScript(data: boolean) {
      ipcRenderer.send('toggle_PythonScripts', data);
    },
  },
});
