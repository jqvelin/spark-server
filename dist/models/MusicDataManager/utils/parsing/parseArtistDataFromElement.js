"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArtistDataFromElement = void 0;
const artistSchema_1 = require("../../types/artist/artistSchema");
const parseAlbumDataFromElement_1 = require("./parseAlbumDataFromElement");
const parseSongDataFromElement_1 = require("./parseSongDataFromElement");
const parseArtistDataFromElement = (element) => {
    var _a, _b, _c, _d, _e;
    const name = (_b = (_a = element.querySelector(".page__title")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim().slice(0, -12);
    const imageSrc = (_c = element.querySelector("img.artist-image")) === null || _c === void 0 ? void 0 : _c.getAttribute("src");
    const songs = [];
    const songElements = element.querySelectorAll('.playlist .track.song-item');
    for (let i = 0; i < songElements.length; i++) {
        const song = (0, parseSongDataFromElement_1.parseSongDataFromElement)(songElements[i]);
        songs.push(song);
    }
    const albums = [];
    // First album element appears on desktop, the second one - on mobile
    const albumElementsWithDuplicates = Array.from(element.querySelectorAll('.album-card'));
    const albumElements = albumElementsWithDuplicates.reduce((acc, albumElement) => {
        var _a, _b;
        const accIds = acc.map(accElement => { var _a, _b; return (_b = (_a = accElement.querySelector("a.album-card__image")) === null || _a === void 0 ? void 0 : _a.getAttribute("href")) === null || _b === void 0 ? void 0 : _b.slice(8); });
        const albumElementId = (_b = (_a = albumElement.querySelector("a.album-card__image")) === null || _a === void 0 ? void 0 : _a.getAttribute("href")) === null || _b === void 0 ? void 0 : _b.slice(8);
        if (!albumElementId || !accIds.includes(albumElementId)) {
            acc.push(albumElement);
        }
        return acc;
    }, []);
    for (let i = 0; i < albumElements.length; i++) {
        const album = (0, parseAlbumDataFromElement_1.parseAlbumDataFromElement)(albumElements[i]);
        albums.push(Object.assign({ id: (_e = (_d = albumElements[i].querySelector("a.album-card__image")) === null || _d === void 0 ? void 0 : _d.getAttribute("href")) === null || _e === void 0 ? void 0 : _e.slice(8) }, album));
    }
    // Id is not present in DOM, but comes from parental method
    return artistSchema_1.artistSchema.omit({ id: true }).parse({
        name,
        imageSrc,
        songs,
        albums
    });
};
exports.parseArtistDataFromElement = parseArtistDataFromElement;
