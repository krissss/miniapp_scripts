// @link https://developers.weixin.qq.com/miniprogram/dev/devtools/http.html
// 请先打开微信开发工具，并完成登录

const config = require('./config')
const { readJsonFile, writeJsonFile, writeJsFile, httpRequest } = require('./tools')
const path = require('path')

const version = config.version
const versionDesc = config.version_desc
const projectRoot = config.project_root


const start = async () => {
  for (const item of config.items) {
    console.log(item.name + '...')

    if (item.version) {
      version = item.version;
    }
    if (item.version_desc) {
      versionDesc = item.version_desc;
    }
    if (item.project_root) {
      projectRoot = item.project_root;
    }

    // 修改项目配置文件
    // project.config.json
    var projectConfigJsonFile = path.join(projectRoot, 'project.config.json')
    var projectConfigJson = readJsonFile(projectConfigJsonFile)
    projectConfigJson.projectname = item.name
    projectConfigJson.appid = item.appid
    writeJsonFile(projectConfigJsonFile, projectConfigJson)
    // app.json
    var appJsonFile = path.join(projectRoot, 'app.json')
    var appjson = readJsonFile(appJsonFile)
    appjson.window.navigationBarTitleText = item.name
    writeJsonFile(appJsonFile, appjson)
    // 特殊的配置文件
    // utils/shopId.js
    var shopIdFile = path.join(projectRoot, 'utils/shopId.js')
    writeJsFile(shopIdFile, `// auto generated!!\nexport default ${item.shopid}`)

    // 上传
    let res = await httpRequest('/upload', {
      projectpath: projectRoot,
      version: version,
      desc: versionDesc,
      infooutput: path.join(__dirname, item.name)
    })

    if (res.result === false) {
      console.error(item.name + ':upload error!')
      console.error(res.errmsg)
      process.exit(1)
    } else {
      console.log('upload success!')
    }
  }
}
start();
