const config = require('./config')
const { absFilename, writePageFile, readJsonFile, writeJsonFile } = require('./tools')
const path = require('path')
const fs = require('fs')

let pages = []
for (const item of config.pages) {
  const jsFile = absFilename(item.path, 'js')
  //console.log(js);process.exit();
  if (fs.existsSync(jsFile)) {
    console.log(item.path + ' exists')
    continue
  }
  writePageFile(jsFile, 'Page({\n})')
  let json = {}
  if (item.name) {
    json.navigationBarTitleText = item.name
  }
  writePageFile(absFilename(item.path, 'json'), JSON.stringify(json, null, 2))
  writePageFile(absFilename(item.path, 'wxss'), '')
  writePageFile(absFilename(item.path, 'wxml'), `<view>${item.name}</view>`)
  console.log(item.path + ' created')

  pages.push(item.path)
}

// 将pages写入 app.json
appJsonFile = path.join(config.projectDir, 'app.json')
let appJson = readJsonFile(appJsonFile)
pages = appJson.pages.concat(pages)
appJson.pages = Array.from(new Set(pages))
appJson.pages.sort()
writeJsonFile(appJsonFile, appJson)
