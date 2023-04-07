"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var glob_1 = __importDefault(require("glob"));
var prettier_1 = __importDefault(require("prettier"));
var eslint = __importStar(require("../lints/eslint"));
var stylelint = __importStar(require("../lints/stylelint"));
var markdownLint = __importStar(require("../lints/markdownlint"));
var constants_1 = require("../utils/constants");
var getIgnore_1 = __importDefault(require("../utils/get-ignore"));
var ignore_1 = getIgnore_1.default('.prettierignore')
exports.default = (function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var cwd, include, quiet, fix, outputReport, getLintFiles, readConfigFile, pkg, config, runErrors, results, files, files_1, files_1_1, filepath, text, options_1, formatted, e_1_1, files, cli, reports, _a, e_2, files, data, e_3, files, data, e_4, reportPath;
    var e_1, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                cwd = options.cwd, include = options.include, quiet = options.quiet, fix = options.fix, outputReport = options.outputReport;
                getLintFiles = function (ext) {
                    var files = options.files;
                    if (files)
                        return files.filter(function (name) { return ext.includes(path_1.default.extname(name)); });
                    var pattern = "**/*.{".concat(ext.map(function (t) { return t.replace(/^\./, ''); }).join(','), "}");
                    return path_1.default.resolve(cwd, include, pattern);
                };
                readConfigFile = function (pth) {
                    var localPath = path_1.default.resolve(cwd, pth);
                    return fs_extra_1.default.existsSync(localPath) ? require(localPath) : {};
                };
                pkg = readConfigFile('package.json');
                config = readConfigFile("".concat(constants_1.PKG_NAME, ".config.js"));
                runErrors = [];
                results = [];
                if (!(fix && config.enablePrettier !== false)) return [3, 8];
                files = options.files
                    ? getLintFiles(constants_1.PRETTIER_FILE_EXT)
                    : glob_1.default.sync("**/*.{".concat(constants_1.PRETTIER_FILE_EXT.map(function (t) { return t.replace(/^\./, ''); }).join(','), "}"), {
                        cwd: cwd,
                        ignore: constants_1.PRETTIER_IGNORE_PATTERN,
                    });
                if (ignore_1) {
                    files = ignore_1.filter(files)
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, 7, 8]);
                files_1 = __values(files), files_1_1 = files_1.next();
                _c.label = 2;
            case 2:
                if (!!files_1_1.done) return [3, 5];
                filepath = files_1_1.value;
                text = fs_extra_1.default.readFileSync(filepath, 'utf8');
                return [4, prettier_1.default.resolveConfig(filepath)];
            case 3:
                options_1 = _c.sent();
                formatted = prettier_1.default.format(text, __assign(__assign({}, options_1), { filepath: filepath }));
                fs_extra_1.default.writeFileSync(filepath, formatted, 'utf8');
                _c.label = 4;
            case 4:
                files_1_1 = files_1.next();
                return [3, 2];
            case 5: return [3, 8];
            case 6:
                e_1_1 = _c.sent();
                e_1 = { error: e_1_1 };
                return [3, 8];
            case 7:
                try {
                    if (files_1_1 && !files_1_1.done && (_b = files_1.return)) _b.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7];
            case 8:
                _c.trys.push([8, 12, , 13]);
                files = getLintFiles(constants_1.ESLINT_FILE_EXT);
                cli = new eslint.ESLint(eslint.getLintConfig(options, pkg, config));
                return [4, cli.lintFiles(files)];
            case 9:
                reports = _c.sent();
                _a = fix;
                if (!_a) return [3, 11];
                return [4, eslint.ESLint.outputFixes(reports)];
            case 10:
                _a = (_c.sent());
                _c.label = 11;
            case 11:
                _a;
                results = results.concat(eslint.formatResults(reports, quiet));
                return [3, 13];
            case 12:
                e_2 = _c.sent();
                runErrors.push(e_2);
                return [3, 13];
            case 13:
                if (!(config.enableStylelint !== false)) return [3, 17];
                _c.label = 14;
            case 14:
                _c.trys.push([14, 16, , 17]);
                files = getLintFiles(constants_1.STYLELINT_FILE_EXT);
                return [4, stylelint.lint(__assign(__assign({}, stylelint.getLintConfig(options, pkg, config)), { files: files }))];
            case 15:
                data = _c.sent();
                results = results.concat(stylelint.formatResults(data.results, quiet));
                return [3, 17];
            case 16:
                e_3 = _c.sent();
                runErrors.push(e_3);
                return [3, 17];
            case 17:
                if (!(config.enableMarkdownlint !== false)) return [3, 21];
                _c.label = 18;
            case 18:
                _c.trys.push([18, 20, , 21]);
                files = options.files
                    ? getLintFiles(constants_1.MARKDOWN_LINT_FILE_EXT)
                    : glob_1.default.sync('**/*.md', { cwd: cwd, ignore: 'node_modules/**' });
                return [4, markdownLint.lint(__assign(__assign({}, markdownLint.getLintConfig(options)), { files: files }))];
            case 19:
                data = _c.sent();
                results = results.concat(markdownLint.formatResults(data, quiet));
                return [3, 21];
            case 20:
                e_4 = _c.sent();
                runErrors.push(e_4);
                return [3, 21];
            case 21:
                if (outputReport) {
                    reportPath = path_1.default.resolve(process.cwd(), "./".concat(constants_1.PKG_NAME, "-report.json"));
                    fs_extra_1.default.outputFile(reportPath, JSON.stringify(results, null, 2), function () { });
                }
                return [2, {
                        results: results,
                        errorCount: results.reduce(function (count, _a) {
                            var errorCount = _a.errorCount;
                            return count + errorCount;
                        }, 0),
                        warningCount: results.reduce(function (count, _a) {
                            var warningCount = _a.warningCount;
                            return count + warningCount;
                        }, 0),
                        runErrors: runErrors,
                    }];
        }
    });
}); });
