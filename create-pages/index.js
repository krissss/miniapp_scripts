const config = require('./config')
const { absFilename, writePageFile } = require('./tools')
const path = require('path')
const fs = require('fs')

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
}
