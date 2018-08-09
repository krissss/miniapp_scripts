const fs = require('fs')
const path = require('path')
const http = require('http')
const qs = require('querystring')
const os = require('os')

let httpPort
function getHttpPort() {
  if (httpPort) {
    return httpPort
  }

  let portPath;
  switch(os.type()) {
    case 'Darwin': // macOS
      portPath = '/Library/Application Support/微信web开发者工具/Default/.ide'
      break
    case 'Windows_NT': // windows
      portPath = '/AppData/Local/微信web开发者工具/User Data/Default/.ide'
      break
    default:
      console.error('不支持的平台')
      process.exit(1)
  }

  const portFile = path.join(os.homedir(), portPath)
  const port = fs.readFileSync(portFile)
  httpPort = port.toString()
  return httpPort
}

module.exports = {
  readJsonFile: function (filename) {
    return JSON.parse(fs.readFileSync(filename))
  },
  writeJsonFile: function (filename, json) {
    fs.writeFileSync(filename, JSON.stringify(json, null, 2));
  },
  writeJsFile: function (filename, jsStr) {
    fs.writeFileSync(filename, jsStr)
  },

  httpRequest: function (urlPath, data = {}, method = 'get') {
    urlPath = urlPath + '?' + qs.stringify(data)
    getHttpPort()
    return new Promise(function (resolve, reject) {
      let req = http.request({
        protocol: 'http:',
        host: '127.0.0.1',
        port: getHttpPort(),
        method: method,
        path: urlPath,
      }, function (res) {
        resolve({ result: true, data: res });
      });

      req.on('error', (e) => {
        resolve({ result: false, errmsg: e.message });
      });
      req.end();
    })
  }
}
