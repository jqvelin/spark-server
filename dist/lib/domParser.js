"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDom = void 0;
const jsdom_1 = __importDefault(require("jsdom"));
const { JSDOM } = jsdom_1.default;
const parseDom = (htmlAsString, querySelector) => {
    const dom = new JSDOM(htmlAsString);
    if (querySelector) {
        return dom.window.document.querySelector(querySelector);
    }
    else {
        return dom.window.document;
    }
};
exports.parseDom = parseDom;
