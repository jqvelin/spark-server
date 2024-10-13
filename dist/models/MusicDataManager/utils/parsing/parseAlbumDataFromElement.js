"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAlbumDataFromElement = void 0;
const albumSchema_1 = require("../../types/album/albumSchema");
const parseSongDataFromElement_1 = require("./parseSongDataFromElement");
const parseAlbumDataFromElement = (element) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    const albumCardId = (_b = (_a = element.querySelector("a.album-card__image")) === null || _a === void 0 ? void 0 : _a.getAttribute("href")) === null || _b === void 0 ? void 0 : _b.slice(8);
    // Checking if it's an album card that should lead to album page, so there is no need to fetch it's content
    if (albumCardId) {
        const coverSrc = (_d = (_c = element.querySelector("img.album-card__image")) === null || _c === void 0 ? void 0 : _c.getAttribute("src")) === null || _d === void 0 ? void 0 : _d.replace("350x100", "100x100");
        const title = (_f = (_e = element.querySelector(".album-card__title")) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.trim();
        const artist = (_h = (_g = element.querySelector(".album-card__author a")) === null || _g === void 0 ? void 0 : _g.textContent) === null || _h === void 0 ? void 0 : _h.trim();
        const artistId = (_k = (_j = element.querySelector(".album-card__author a")) === null || _j === void 0 ? void 0 : _j.getAttribute("href")) === null || _k === void 0 ? void 0 : _k.slice(8).trim();
        return albumSchema_1.albumSchema.parse({ id: albumCardId, coverSrc, title, artist, artistId });
    }
    const title = (_m = (_l = element.querySelector(".page__title.page__title_album")) === null || _l === void 0 ? void 0 : _l.textContent) === null || _m === void 0 ? void 0 : _m.trim();
    const artist = (_p = (_o = element.querySelector(".same-artist__item a")) === null || _o === void 0 ? void 0 : _o.textContent) === null || _p === void 0 ? void 0 : _p.trim();
    const artistId = (_r = (_q = element.querySelector(".same-artist__item a")) === null || _q === void 0 ? void 0 : _q.getAttribute("href")) === null || _r === void 0 ? void 0 : _r.slice(8).trim();
    const coverSrc = (_t = (_s = element.querySelector("img.page__img")) === null || _s === void 0 ? void 0 : _s.getAttribute("src")) === null || _t === void 0 ? void 0 : _t.replace("350x100", "400x400");
    const songs = [];
    const songElements = element === null || element === void 0 ? void 0 : element.querySelectorAll('.playlist .track.song-item');
    for (let i = 0; i < songElements.length; i++) {
        const song = (0, parseSongDataFromElement_1.parseSongDataFromElement)(songElements[i]);
        songs.push(song);
    }
    const genres = [];
    const genreElements = element.querySelectorAll(".badge-item.badge-item_artist");
    for (let i = 0; i < genreElements.length; i++) {
        const genre = (_u = genreElements[i].textContent) === null || _u === void 0 ? void 0 : _u.trim();
        if (!genre)
            continue;
        genres.push(genre);
    }
    // Id is not present in DOM, but comes from parental method
    return albumSchema_1.albumSchema.omit({ id: true }).parse({
        title,
        artist,
        artistId,
        coverSrc,
        songs,
        genres
    });
};
exports.parseAlbumDataFromElement = parseAlbumDataFromElement;
