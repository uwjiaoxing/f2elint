"use strict";
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
exports.PRETTIER_IGNORE_PATTERN = exports.PRETTIER_FILE_EXT = exports.MARKDOWN_LINT_IGNORE_PATTERN = exports.MARKDOWN_LINT_FILE_EXT = exports.STYLELINT_IGNORE_PATTERN = exports.STYLELINT_FILE_EXT = exports.ESLINT_IGNORE_PATTERN = exports.ESLINT_FILE_EXT = exports.PROJECT_TYPES = exports.PKG_VERSION = exports.PKG_NAME = exports.UNICODE = void 0;
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var pkg = JSON.parse(fs_extra_1.default.readFileSync(path_1.default.join(__dirname, '../../package.json'), 'utf8'));
var UNICODE;
(function (UNICODE) {
    UNICODE["success"] = "\u2714";
    UNICODE["failure"] = "\u2716";
})(UNICODE = exports.UNICODE || (exports.UNICODE = {}));
exports.PKG_NAME = pkg.name;
exports.PKG_VERSION = pkg.version;
exports.PROJECT_TYPES = [
    {
        name: '未使用 React、Vue、Node.js 的项目（JavaScript）',
        value: 'index',
    },
    {
        name: '未使用 React、Vue、Node.js 的项目（TypeScript）',
        value: 'typescript',
    },
    {
        name: 'React 项目（JavaScript）',
        value: 'react',
    },
    {
        name: 'React 项目（TypeScript）',
        value: 'typescript/react',
    },
    {
        name: 'Rax 项目（JavaScript）',
        value: 'rax',
    },
    {
        name: 'Rax 项目（TypeScript）',
        value: 'typescript/rax',
    },
    {
        name: 'Vue 项目（JavaScript）',
        value: 'vue',
    },
    {
        name: 'Vue 项目（TypeScript）',
        value: 'typescript/vue',
    },
    {
        name: 'Node.js 项目（JavaScript）',
        value: 'node',
    },
    {
        name: 'Node.js 项目（TypeScript）',
        value: 'typescript/node',
    },
    {
        name: '使用 ES5 及之前版本 JavaScript 的老项目',
        value: 'es5',
    },
];
exports.ESLINT_FILE_EXT = ['.js', '.jsx', '.ts', '.tsx', '.vue'];
exports.ESLINT_IGNORE_PATTERN = [
    'node_modules/',
    'build/',
    'dist/',
    'coverage/',
    'es/',
    'lib/',
    '**/*.min.js',
    '**/*-min.js',
    '**/*.bundle.js',
];
exports.STYLELINT_FILE_EXT = ['.css', '.scss', '.less', '.acss'];
exports.STYLELINT_IGNORE_PATTERN = [
    'node_modules/',
    'build/',
    'dist/',
    'coverage/',
    'es/',
    'lib/',
    '**/*.min.css',
    '**/*-min.css',
    '**/*.bundle.css',
];
exports.MARKDOWN_LINT_FILE_EXT = ['.md'];
exports.MARKDOWN_LINT_IGNORE_PATTERN = [
    'node_modules/',
    'build/',
    'dist/',
    'coverage/',
    'es/',
    'lib/',
];
exports.PRETTIER_FILE_EXT = __spreadArray(__spreadArray(__spreadArray([], __read(exports.STYLELINT_FILE_EXT), false), __read(exports.ESLINT_FILE_EXT), false), __read(exports.MARKDOWN_LINT_FILE_EXT), false);
exports.PRETTIER_IGNORE_PATTERN = [
    'node_modules/**/*',
    'build/**/*',
    'dist/**/*',
    'lib/**/*',
    'es/**/*',
    'coverage/**/*',
];
