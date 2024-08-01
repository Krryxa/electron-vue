import { BrowserWindow, ipcMain, globalShortcut } from 'electron'
import path from 'node:path'
import loadPage from './loadPage.js'
import getDirname from './dirname.js'

const __dirname = getDirname(import.meta.url)

// 打开子窗口
const openChildWindow = (parent, params) => {
  const { modal, width, height, router } = params
  let childWindow = new BrowserWindow({
    parent,
    modal,
    width,
    height,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, '../preload/api.mjs')
    }
  })

  loadPage(childWindow, router)

  // 注册快捷键，用于打开开发者工具
  globalShortcut.register('CommandOrControl+D', () => {
    childWindow.webContents.openDevTools()
  })

  childWindow.on('closed', () => {
    childWindow = null
    globalShortcut.unregister('CommandOrControl+D')
  })
}

// 监听打开子窗口
ipcMain.on('open-child-window', (event, params) => {
  // 返回拥有给定 webContents 的窗口
  const parentWindow = BrowserWindow.fromWebContents(event.sender)
  openChildWindow(parentWindow, params)
})

// 监听关闭子窗口
ipcMain.on('close-child-window', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  win.close()
})
