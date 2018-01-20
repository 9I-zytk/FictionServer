import fs from 'fs'
import path from 'path'

const deleteLog = function (_path) {
  const logDir = path.resolve(_path)
  // 根据文件路径读取文件，返回文件列表
  const fileTraverse = function (filePath) {
    fs.readdir(filePath, function (err, files) {
      if (err) {
        throw err
      } else {
        // 遍历读取到的文件列表
        files.forEach(function (filename) {
          // 获取当前文件的绝对路径
          const filedir = path.join(filePath, filename)
          // 根据文件路径获取文件信息，返回一个fs.Stats对象
          fs.stat(filedir, function (error, stats) {
            if (error) {
              throw error
            } else {
              const isFile = stats.isFile()// 是文件
              const isDir = stats.isDirectory()// 是文件夹
              if (isFile) {
                const fileTime = new Date().getTime() - stats.ctimeMs
                if (fileTime > 7 * 24 * 60 * 60 * 1000) {
                  deleteFile(filedir)
                }
                if (fileTime > 1 * 24 * 60 * 60 * 1000 && stats.size === 0) {
                  deleteFile(filedir)
                }
              }
              if (isDir) {
                fileTraverse(filedir)
              }
            }
          })
        })
      }
    })
  }
  const deleteFile = function (fileDir) {
    fs.unlink(fileDir, (err) => {
      if (err) throw err
      console.log('成功删除文件:' + fileDir)
    })
  }
  fileTraverse(logDir)
}
export default deleteLog
module.exports = deleteLog
