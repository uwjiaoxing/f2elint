 // 添加 ignore
var __importDefault =
(this && this.__importDefault) ||
function (mod) {
  return mod && mod.__esModule ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
var fs_extra_1 = __importDefault(require('fs-extra'))
var glob_1 = __importDefault(require('glob'))
var ignore_1 = __importDefault(require('ignore'))


exports.default = (function(filename){
  var ignoreConfigFiles = glob_1.default.sync(filename, {
    cwd: process.cwd(),
  })
  if (ignoreConfigFiles.length) {
    var originalText = fs_extra_1.default.readFileSync(
      ignoreConfigFiles[0],
      'utf8'
    )
    var ig = ignore_1.default().add(originalText)
    return ig
  }
  return null
})