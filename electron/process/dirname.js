import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// 获取 __dirname：获取文件所在目录
// ESM（ECMAScript Module）环境中，__dirname 和 __filename 这两个全局变量是未定义的，需要手动定义
export default (url) => dirname(fileURLToPath(url))
