'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.lint = exports.formatResults = exports.getLintConfig = void 0
var path_1 = __importDefault(require('path'))
var fs_extra_1 = __importDefault(require('fs-extra'))
var glob_1 = __importDefault(require('glob'))
var markdownlint_1 = __importDefault(require('markdownlint'))
var markdownlint_config_ali_1 = __importDefault(
  require('markdownlint-config-ali')
)
var markdownlint_rule_helpers_1 = __importDefault(
  require('markdownlint-rule-helpers')
)
var getLintConfig = function (opts) {
  var cwd = opts.cwd
  var lintConfig = {
    fix: Boolean(opts.fix),
    resultVersion: 3,
  }
  var lintConfigFiles = glob_1.default.sync(
    '.markdownlint(.@(yaml|yml|json))',
    { cwd: cwd }
  )
  if (lintConfigFiles.length === 0) {
    lintConfig.config = markdownlint_config_ali_1.default
  } else {
    lintConfig.config = markdownlint_1.default.readConfigSync(
      path_1.default.resolve(cwd, lintConfigFiles[0])
    )
  }
  return lintConfig
}
exports.getLintConfig = getLintConfig
var formatResults = function (results, quiet) {
  var parsedResults = []
  var _loop_1 = function (file) {
    if (!Object.prototype.hasOwnProperty.call(results, file) || quiet)
      return 'continue'
    var warningCount = 0
    var fixableWarningCount = 0
    var messages = results[file].map(function (_a) {
      var lineNumber = _a.lineNumber,
        ruleNames = _a.ruleNames,
        ruleDescription = _a.ruleDescription,
        ruleInformation = _a.ruleInformation,
        errorRange = _a.errorRange,
        fixInfo = _a.fixInfo
      if (fixInfo) fixableWarningCount++
      warningCount++
      return {
        line: lineNumber,
        column: Array.isArray(errorRange) ? errorRange[0] : 1,
        rule: ruleNames[0],
        url: ruleInformation,
        message: ruleDescription,
        errored: false,
      }
    })
    parsedResults.push({
      filePath: file,
      messages: messages,
      errorCount: 0,
      warningCount: warningCount,
      fixableErrorCount: 0,
      fixableWarningCount: fixableWarningCount,
    })
  }
  for (var file in results) {
    _loop_1(file)
  }
  return parsedResults
}
exports.formatResults = formatResults

var getIgnore_1 = __importDefault(require("../utils/get-ignore"));
var ignore_1 = getIgnore_1.default('.markdownlintignore')
var lint = function (options) {
  // 添加 ignore
  if (ignore_1) {
    options.files = ignore_1.filter(options.files)
  }
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2,
        new Promise(function (resolve, reject) {
          ;(0, markdownlint_1.default)(options, function (err, result) {
            if (options.fix) {
              for (var file in result) {
                if (!Object.prototype.hasOwnProperty.call(result, file))
                  continue
                var fixes = result[file].filter(function (error) {
                  return error.fixInfo
                })
                if (fixes.length > 0) {
                  var originalText = fs_extra_1.default.readFileSync(
                    file,
                    'utf8'
                  )
                  var fixedText =
                    markdownlint_rule_helpers_1.default.applyFixes(
                      originalText,
                      fixes
                    )
                  if (originalText !== fixedText) {
                    fs_extra_1.default.writeFileSync(file, fixedText, 'utf8')
                    result[file] = result[file].filter(function (error) {
                      return !error.fixInfo
                    })
                  }
                }
              }
            }
            err ? reject(err) : resolve(result)
          })
        }),
      ]
    })
  })
}
exports.lint = lint
