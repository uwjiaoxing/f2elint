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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResults = exports.getLintConfig = void 0;
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var glob_1 = __importDefault(require("glob"));
var constants_1 = require("../utils/constants");
var getRuleDocUrl = function (rule) {
    var match = rule.match(/^@scss\/(\S+)$/);
    if (match) {
        return "https://github.com/kristerkari/stylelint-scss/tree/master/src/rules/".concat(match[1]);
    }
    if (rule !== 'CssSyntaxError')
        return "https://stylelint.io/user-guide/rules/".concat(rule);
    return '';
};
var getLintConfig = function (opts, pkg, config) {
    var cwd = opts.cwd, fix = opts.fix;
    if (config.enableStylelint === false)
        return {};
    var lintConfig = {
        fix: Boolean(fix),
        allowEmptyInput: true,
    };
    var lintConfigFiles = glob_1.default.sync('.stylelintrc?(.@(js|yaml|yml|json))', { cwd: cwd });
    if (lintConfigFiles.length === 0 && !pkg.stylelint) {
        lintConfig.configBasedir = path_1.default.resolve(__dirname, '../../node_modules/');
        lintConfig.config = {
            extends: 'stylelint-config-ali',
        };
    }
    var ignoreFilePath = path_1.default.resolve(cwd, '.stylelintignore');
    if (!fs_extra_1.default.existsSync(ignoreFilePath)) {
        lintConfig.ignorePattern = constants_1.STYLELINT_IGNORE_PATTERN;
    }
    return lintConfig;
};
exports.getLintConfig = getLintConfig;
var formatResults = function (results, quiet) {
    return results.map(function (_a) {
        var source = _a.source, warnings = _a.warnings;
        var errorCount = 0;
        var warningCount = 0;
        var messages = warnings
            .filter(function (item) { return !quiet || item.severity === 'error'; })
            .map(function (item) {
            var _a = item.line, line = _a === void 0 ? 0 : _a, _b = item.column, column = _b === void 0 ? 0 : _b, rule = item.rule, severity = item.severity, text = item.text;
            if (severity === 'error') {
                errorCount++;
            }
            else {
                warningCount++;
            }
            return {
                line: line,
                column: column,
                rule: rule,
                url: getRuleDocUrl(rule),
                message: text.replace(/([^ ])\.$/u, '$1').replace(new RegExp("\\(".concat(rule, "\\)")), ''),
                errored: severity === 'error',
            };
        });
        return {
            filePath: source,
            messages: messages,
            errorCount: errorCount,
            warningCount: warningCount,
            fixableErrorCount: 0,
            fixableWarningCount: 0,
        };
    });
};
exports.formatResults = formatResults;
__exportStar(require("stylelint"), exports);
