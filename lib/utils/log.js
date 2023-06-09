"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var constants_1 = require("./constants");
var green = chalk_1.default.green, blue = chalk_1.default.blue, yellow = chalk_1.default.yellow, red = chalk_1.default.red;
exports.default = {
    success: function (text) {
        console.log(green(text));
    },
    info: function (text) {
        console.info(blue(text));
    },
    warn: function (text) {
        console.info(yellow(text));
    },
    error: function (text) {
        console.error(red(text));
    },
    result: function (text, pass) {
        console.info(blue("[".concat(constants_1.PKG_NAME, "] ").concat(text)), pass ? green(constants_1.UNICODE.success) : red(constants_1.UNICODE.failure));
    },
};
