const tools = require('../tools')
const config = require('./config')
const path = require('path')
const fs = require('fs')

const projectDir = config.projectDir

function mkdirs(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirs(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

module.exports = Object.assign(tools, {
  absFilename(filePath, fileExt) {
    return path.join(projectDir, filePath + '.' + fileExt)
  },
  writePageFile(filename, data) {
    mkdirs(path.dirname(filename))
    fs.writeFileSync(filename, data)
  }
})
