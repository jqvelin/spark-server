"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAlbumDataFromElement = void 0;
const albumSchema_1 = require("../../types/album/albumSchema");
const parseSongDataFromElement_1 = require("./parseSongDataFromElement");
const parseAlbumDataFromElement = (element) => {
    var _a, _b, _c, _d, _e;
    const title = (_b = (_a = element === null || element === void 0 ? void 0 : element.querySelector(".page__title.page__title_album")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
    const artist = (_d = (_c = element === null || element === void 0 ? void 0 : element.querySelector(".same-artist__item a")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim();
    const coverSrc = (_e = element === null || element === void 0 ? void 0 : element.querySelector("img.page__img")) === null || _e === void 0 ? void 0 : _e.getAttribute("src");
    const songs = [];
    const songElements = element === null || element === void 0 ? void 0 : element.querySelectorAll('.playlist .track.song-item');
    for (let i = 0; i < songElements.length; i++) {
        const song = (0, parseSongDataFromElement_1.parseSongDataFromElement)(songElements[i]);
        songs.push(song);
    }
    return albumSchema_1.albumSchema.omit({ id: true }).parse({
        title,
        artist,
        coverSrc,
        songs
    });
};
exports.parseAlbumDataFromElement = parseAlbumDataFromElement;
