"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domParser = void 0;
const jsdom_1 = require("jsdom");
const domParser = (htmlAsString, querySelector) => {
    const dom = new jsdom_1.JSDOM(htmlAsString);
    if (querySelector) {
        return dom.window.document.querySelector(querySelector);
    }
    else {
        return dom.window.document;
    }
};
exports.domParser = domParser;
