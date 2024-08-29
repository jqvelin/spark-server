"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAlbumDataFromElement = void 0;
const albumSchema_1 = require("../../types/album/albumSchema");
const parseSongDataFromElement_1 = require("./parseSongDataFromElement");
const parseAlbumDataFromElement = (element) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const albumCardId = (_b = (_a = element.querySelector("a.album-card__image")) === null || _a === void 0 ? void 0 : _a.getAttribute("href")) === null || _b === void 0 ? void 0 : _b.slice(8);
    // Checking if it's an album card that should lead to album page, so there is no need to fetch it's content
    if (albumCardId) {
        const coverSrc = (_c = element.querySelector("img.album-card__image")) === null || _c === void 0 ? void 0 : _c.getAttribute("src");
        const title = (_e = (_d = element.querySelector(".album-card__title")) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.trim();
        const artist = (_g = (_f = element.querySelector(".album-card__author a")) === null || _f === void 0 ? void 0 : _f.textContent) === null || _g === void 0 ? void 0 : _g.trim();
        return albumSchema_1.albumSchema.parse({ id: albumCardId, coverSrc, title, artist });
    }
    const title = (_j = (_h = element.querySelector(".page__title.page__title_album")) === null || _h === void 0 ? void 0 : _h.textContent) === null || _j === void 0 ? void 0 : _j.trim();
    const artist = (_l = (_k = element.querySelector(".same-artist__item a")) === null || _k === void 0 ? void 0 : _k.textContent) === null || _l === void 0 ? void 0 : _l.trim();
    const coverSrc = (_m = element.querySelector("img.page__img")) === null || _m === void 0 ? void 0 : _m.getAttribute("src");
    const songs = [];
    const songElements = element === null || element === void 0 ? void 0 : element.querySelectorAll('.playlist .track.song-item');
    for (let i = 0; i < songElements.length; i++) {
        const song = (0, parseSongDataFromElement_1.parseSongDataFromElement)(songElements[i]);
        songs.push(song);
    }
    const genres = [];
    const genreElements = element.querySelectorAll(".badge-item.badge-item_artist");
    for (let i = 0; i < genreElements.length; i++) {
        const genre = (_o = genreElements[i].textContent) === null || _o === void 0 ? void 0 : _o.trim();
        if (!genre)
            continue;
        genres.push(genre);
    }
    // Id is not present in DOM, but comes from parental method
    return albumSchema_1.albumSchema.omit({ id: true }).parse({
        title,
        artist,
        coverSrc,
        songs,
        genres
    });
};
exports.parseAlbumDataFromElement = parseAlbumDataFromElement;
