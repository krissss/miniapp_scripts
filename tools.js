const fs = require('fs')

module.exports = {
  readJsonFile: function (filename) {
    return JSON.parse(fs.readFileSync(filename))
  },
  writeJsonFile: function (filename, json) {
    fs.writeFileSync(filename, JSON.stringify(json, null, 2));
  },
  writeFile: function (filename, jsStr) {
    fs.writeFileSync(filename, jsStr)
  }
}
