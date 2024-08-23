"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArtistSearchDataFromElement = void 0;
const artistSchema_1 = require("../../types/artist/artistSchema");
const parseArtistSearchDataFromElement = (element) => {
    var _a, _b, _c;
    const id = (_b = (_a = element.querySelector('a')) === null || _a === void 0 ? void 0 : _a.getAttribute("href")) === null || _b === void 0 ? void 0 : _b.slice(8);
    const name = (_c = element.querySelector('a')) === null || _c === void 0 ? void 0 : _c.textContent;
    return artistSchema_1.artistSchema.parse({ id, name });
};
exports.parseArtistSearchDataFromElement = parseArtistSearchDataFromElement;
