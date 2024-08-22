"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFreshAlbumDataFromElement = void 0;
const albumSchema_1 = require("../../types/album/albumSchema");
const parseFreshAlbumDataFromElement = (element) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const id = (_b = (_a = element.querySelector("a.album-card__image")) === null || _a === void 0 ? void 0 : _a.getAttribute("href")) === null || _b === void 0 ? void 0 : _b.slice(8);
    const coverSrc = (_c = element.querySelector("img.album-card__image")) === null || _c === void 0 ? void 0 : _c.getAttribute("src");
    const title = (_e = (_d = element.querySelector(".album-card__title")) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.trim();
    const artist = (_g = (_f = element.querySelector(".album-card__author a")) === null || _f === void 0 ? void 0 : _f.textContent) === null || _g === void 0 ? void 0 : _g.trim();
    return albumSchema_1.albumSchema.parse({ id, coverSrc, title, artist });
};
exports.parseFreshAlbumDataFromElement = parseFreshAlbumDataFromElement;
