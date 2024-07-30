import { contextBridge, ipcRenderer } from 'electron'

// 使用 contextBridge 安全地暴露 API，注入到 window，可以在渲染器（页面）通过 window[apiKey] 访问
contextBridge.exposeInMainWorld('electronAPI', {
  openChildWin: (data) => ipcRenderer.send('open-child-window', data),
  closeChildWin: () => ipcRenderer.send('close-child-window')

  // 出于安全原因，不要直接暴露整个 ipcRenderer.send API，确保尽可能限制渲染器对 Electron API 的访问
  // send: (channel, data) => ipcRenderer.send(channel, data)
})
