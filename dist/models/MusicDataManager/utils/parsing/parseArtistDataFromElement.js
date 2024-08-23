"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArtistDataFromElement = void 0;
const parseAlbumCardDataFromElement_1 = require("./parseAlbumCardDataFromElement");
const parseSongDataFromElement_1 = require("./parseSongDataFromElement");
const parseArtistDataFromElement = (element) => {
    var _a, _b, _c;
    const name = (_b = (_a = element.querySelector(".page__title")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim().slice(0, -12);
    const imageSrc = (_c = element.querySelector("img.artist-image")) === null || _c === void 0 ? void 0 : _c.getAttribute("src");
    const songs = [];
    const songElements = element.querySelectorAll('.playlist .track.song-item');
    for (let i = 0; i < songElements.length; i++) {
        const song = (0, parseSongDataFromElement_1.parseSongDataFromElement)(songElements[i]);
        songs.push(song);
    }
    const albums = [];
    const albumElements = element.querySelectorAll('.album-card');
    for (let i = 0; i < albumElements.length; i++) {
        const album = (0, parseAlbumCardDataFromElement_1.parseAlbumCardDataFromElement)(albumElements[i]);
        albums.push(album);
    }
    return {
        name,
        imageSrc,
        songs,
        albums
    };
};
exports.parseArtistDataFromElement = parseArtistDataFromElement;
