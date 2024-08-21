"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlbumDataById = void 0;
const axios_1 = __importDefault(require("axios"));
const domParser_1 = require("./domParser");
const parseSongDataFromElement_1 = require("./parseSongDataFromElement");
const getAlbumDataById = (albumId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const html = yield axios_1.default.get(`https://mp3party.net/albums/${albumId}`);
        const dom = (0, domParser_1.parseDom)(html.data);
        const title = (_b = (_a = dom === null || dom === void 0 ? void 0 : dom.querySelector(".page__title.page__title_album")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
        const artist = (_d = (_c = dom === null || dom === void 0 ? void 0 : dom.querySelector(".same-artist__item a")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim();
        const coverSrc = (_e = dom === null || dom === void 0 ? void 0 : dom.querySelector("img.page__img")) === null || _e === void 0 ? void 0 : _e.getAttribute("src");
        const songs = [];
        const songElements = dom === null || dom === void 0 ? void 0 : dom.querySelectorAll('.playlist .track.song-item');
        if (!songElements)
            return;
        for (let i = 0; i < songElements.length; i++) {
            const song = (0, parseSongDataFromElement_1.parseSongDataFromElement)(songElements[i]);
            songs.push(song);
        }
        const album = {
            id: albumId,
            coverSrc,
            title,
            artist,
            songs,
        };
        return album;
    }
    catch (e) {
        return null;
    }
});
exports.getAlbumDataById = getAlbumDataById;
