"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResults = exports.getLintConfig = void 0;
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var glob_1 = __importDefault(require("glob"));
var constants_1 = require("../utils/constants");
var getConfigType = function (cwd, pkg) {
    var tsFiles = glob_1.default.sync('./!(node_modules)/**/*.@(ts|tsx)', { cwd: cwd });
    var reactFiles = glob_1.default.sync('./!(node_modules)/**/*.@(jsx|tsx)', { cwd: cwd });
    var vueFiles = glob_1.default.sync('./!(node_modules)/**/*.vue', { cwd: cwd });
    var dependencies = Object.keys(pkg.dependencies || {});
    var language = tsFiles.length > 0 ? 'typescript' : '';
    var dsl = '';
    if (reactFiles.length > 0 || dependencies.some(function (name) { return /^react(-|$)/.test(name); })) {
        dsl = 'react';
    }
    else if (vueFiles.length > 0 || dependencies.some(function (name) { return /^vue(-|$)/.test(name); })) {
        dsl = 'vue';
    }
    else if (dependencies.some(function (name) { return /^rax(-|$)/.test(name); })) {
        dsl = 'rax';
    }
    return 'eslint-config-ali/' + "".concat(language, "/").concat(dsl).replace(/\/$/, '/index').replace(/^\//, '');
};
var getRuleDocUrl = function (rule) {
    if (!rule)
        return '';
    var match = rule.match(/^@typescript-eslint\/(\S+)$/);
    if (match) {
        return "https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/".concat(match[1], ".md");
    }
    match = rule.match(/^import\/(\S+)$/);
    if (match) {
        return "https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/".concat(match[1], ".md");
    }
    match = rule.match(/^jsx-a11y\/(\S+)$/);
    if (match) {
        return "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/master/docs/rules/".concat(match[1], ".md");
    }
    if (/^react\/(no-constructor-dom|no-will-mount-dom)$/.test(rule)) {
        return 'https://github.com/ytanruengsri/eslint-plugin-react-ssr';
    }
    if (/^react-hooks-ssr\//.test(rule)) {
        return 'https://github.com/correttojs/eslint-plugin-react-hooks-ssr#documentation';
    }
    if (/^react-hooks\/(\S+)$/.test(rule)) {
        return 'https://reactjs.org/docs/hooks-rules.html#eslint-plugin';
    }
    match = rule.match(/^react\/(\S+)$/);
    if (match) {
        return "https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/".concat(match[1], ".md");
    }
    match = rule.match(/^vue\/(\S+)$/);
    if (match) {
        return "https://eslint.vuejs.org/rules/".concat(match[1], ".html");
    }
    return "https://eslint.org/docs/rules/".concat(rule);
};
var getLintConfig = function (opts, pkg, config) {
    var cwd = opts.cwd, fix = opts.fix, ignore = opts.ignore;
    var lintConfig = {
        cwd: cwd,
        fix: fix,
        ignore: ignore,
        extensions: constants_1.ESLINT_FILE_EXT,
        errorOnUnmatchedPattern: false,
    };
    var lintConfigFiles = glob_1.default.sync('.eslintrc?(.@(js|yaml|yml|json))', { cwd: cwd });
    if (lintConfigFiles.length === 0 && !pkg.eslintConfig) {
        lintConfig.resolvePluginsRelativeTo = path_1.default.resolve(__dirname, '../../');
        lintConfig.useEslintrc = false;
        lintConfig.baseConfig = {
            extends: __spreadArray([
                path_1.default.resolve(__dirname, "../../node_modules/".concat(getConfigType(cwd, pkg)))
            ], __read((config.enablePrettier ? ['prettier/@typescript-eslint'] : [])), false),
        };
    }
    var lintIgnoreFile = path_1.default.resolve(cwd, '.eslintignore');
    if (!fs_extra_1.default.existsSync(lintIgnoreFile) && !pkg.eslintIgnore) {
        lintConfig.ignorePath = path_1.default.resolve(__dirname, '../config/_eslintignore.ejs');
    }
    return lintConfig;
};
exports.getLintConfig = getLintConfig;
var formatResults = function (results, quiet) {
    return results
        .filter(function (_a) {
        var warningCount = _a.warningCount, errorCount = _a.errorCount;
        return errorCount || warningCount;
    })
        .map(function (_a) {
        var filePath = _a.filePath, messages = _a.messages, errorCount = _a.errorCount, warningCount = _a.warningCount, fixableErrorCount = _a.fixableErrorCount, fixableWarningCount = _a.fixableWarningCount;
        return ({
            filePath: filePath,
            errorCount: errorCount,
            warningCount: quiet ? 0 : warningCount,
            fixableErrorCount: fixableErrorCount,
            fixableWarningCount: quiet ? 0 : fixableWarningCount,
            messages: messages
                .map(function (_a) {
                var _b = _a.line, line = _b === void 0 ? 0 : _b, _c = _a.column, column = _c === void 0 ? 0 : _c, ruleId = _a.ruleId, message = _a.message, fatal = _a.fatal, severity = _a.severity;
                return {
                    line: line,
                    column: column,
                    rule: ruleId,
                    url: getRuleDocUrl(ruleId),
                    message: message.replace(/([^ ])\.$/u, '$1'),
                    errored: fatal || severity === 2,
                };
            })
                .filter(function (_a) {
                var errored = _a.errored;
                return (quiet ? errored : true);
            }),
        });
    });
};
exports.formatResults = formatResults;
__exportStar(require("eslint"), exports);
