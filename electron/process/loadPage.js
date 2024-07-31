import path from 'node:path'
import isDev from 'electron-is-dev'
import getDirname from './dirname.js'

const __dirname = getDirname(import.meta.url)

// prod 环境不建议再用 loadURL 读取
// const prodURL = `file://${path.join(__dirname, 'pages/index.html')}`

// dev 环境建议 loadURL（可热更新）
// prod 环境建议 loadFile（不同项目具体分析）
export default (win, router = '') => {
  isDev
    ? win.loadURL(`http://localhost:5173/#/${router}`)
    : win.loadFile(path.resolve(__dirname, `../pages/index.html`), {
        hash: router
      })
}
