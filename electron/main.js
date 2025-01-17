// main.js

// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import isDev from 'electron-is-dev'
import loadPage from './process/loadPage.js'
import getDirname from './process/dirname.js'
import './process/createWin.js'

const __dirname = getDirname(import.meta.url)

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    // 不能直接在主进程中编辑DOM，因为它无法访问渲染器文档上下文，存在于两个不同的进程
    // 所以需要预加载脚本：在渲染器进程加载之前加载，并有权访问两个渲染器全局 (例如 window 和 document) 和 Node.js 环境
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, 'preload/index.mjs')
    }
  })

  // 加载页面
  loadPage(mainWindow)

  // 开发环境默认打开调试工具
  isDev && mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序
// 因此，通常对应用程序和它们的菜单栏来说应该时刻保持激活状态，直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 import 导入