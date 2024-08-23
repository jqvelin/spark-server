"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAlbumDataFromElement = void 0;
const albumSchema_1 = require("../../types/album/albumSchema");
const parseSongDataFromElement_1 = require("./parseSongDataFromElement");
const parseAlbumDataFromElement = (element) => {
    var _a, _b, _c, _d, _e, _f;
    const title = (_b = (_a = element.querySelector(".page__title.page__title_album")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
    const artist = (_d = (_c = element.querySelector(".same-artist__item a")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim();
    const coverSrc = (_e = element.querySelector("img.page__img")) === null || _e === void 0 ? void 0 : _e.getAttribute("src");
    const songs = [];
    const songElements = element === null || element === void 0 ? void 0 : element.querySelectorAll('.playlist .track.song-item');
    for (let i = 0; i < songElements.length; i++) {
        const song = (0, parseSongDataFromElement_1.parseSongDataFromElement)(songElements[i]);
        songs.push(song);
    }
    const genres = [];
    const genreElements = element.querySelectorAll(".badge-item.badge-item_artist");
    for (let i = 0; i < genreElements.length; i++) {
        const genre = (_f = genreElements[i].textContent) === null || _f === void 0 ? void 0 : _f.trim();
        if (!genre)
            continue;
        genres.push(genre);
    }
    return albumSchema_1.albumSchema.omit({ id: true }).parse({
        title,
        artist,
        coverSrc,
        songs,
        genres
    });
};
exports.parseAlbumDataFromElement = parseAlbumDataFromElement;
