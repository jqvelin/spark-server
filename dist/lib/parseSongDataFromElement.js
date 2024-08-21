"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSongDataFromElement = void 0;
const songSchema_1 = require("../model/song/songSchema");
const parseSongDataFromElement = (element) => {
    var _a, _b, _c, _d, _e, _f;
    const id = (_a = element.querySelector(".track__user-panel")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-js-id");
    const coverSrc = ((_b = element.querySelector(".track__user-panel")) === null || _b === void 0 ? void 0 : _b.getAttribute("data-js-image")) ? "https://mp3party.net/" + ((_c = element.querySelector(".track__user-panel")) === null || _c === void 0 ? void 0 : _c.getAttribute("data-js-image")) : null;
    const artist = (_d = element.querySelector(".track__user-panel")) === null || _d === void 0 ? void 0 : _d.getAttribute("data-js-artist-name");
    const title = (_e = element.querySelector(".track__user-panel")) === null || _e === void 0 ? void 0 : _e.getAttribute("data-js-song-title");
    const duration = (_f = element.querySelectorAll(".track__info-item")[0].textContent) === null || _f === void 0 ? void 0 : _f.trim();
    return songSchema_1.songSchema.parse({
        id,
        coverSrc,
        artist,
        title,
        duration,
    });
};
exports.parseSongDataFromElement = parseSongDataFromElement;
