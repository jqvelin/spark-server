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
exports.MusicDataManager = void 0;
const axios_1 = __importDefault(require("axios"));
const isUrlValid_1 = require("../../lib/isUrlValid");
const parseSongDataFromElement_1 = require("./utils/parsing/parseSongDataFromElement");
const domParser_1 = require("../../lib/domParser");
const parseArtistSearchDataFromElement_1 = require("./utils/parsing/parseArtistSearchDataFromElement");
const parseAlbumDataFromElement_1 = require("./utils/parsing/parseAlbumDataFromElement");
const parseArtistDataFromElement_1 = require("./utils/parsing/parseArtistDataFromElement");
const parseAlbumCardDataFromElement_1 = require("./utils/parsing/parseAlbumCardDataFromElement");
class MusicDataManager {
    constructor(BASE_URL) {
        if (!(0, isUrlValid_1.isUrlValid)(BASE_URL)) {
            throw new Error("Invalid BASE_URL");
        }
        else {
            this.BASE_URL = BASE_URL;
        }
    }
    getHomepageSongs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const html = yield axios_1.default.get(this.BASE_URL);
                const dom = (0, domParser_1.parseDom)(html.data);
                const songGroups = {
                    fresh: [],
                    trendingGlobal: [],
                    bestOfToday: [],
                    trendingRussia: []
                };
                const songSectionElements = dom === null || dom === void 0 ? void 0 : dom.querySelectorAll(".playlist");
                if (!songSectionElements)
                    return;
                const songSectionIndices = ["fresh", "bestOfToday", "trendingGlobal", "trendingRussia"];
                for (let i = 0; i < songSectionIndices.length; i++) {
                    const [songSectionTitle, songSectionElement] = [songSectionIndices[i], songSectionElements[i]];
                    const songElements = songSectionElement.querySelectorAll('.track.song-item');
                    for (let j = 0; j < songElements.length; j++) {
                        const song = (0, parseSongDataFromElement_1.parseSongDataFromElement)(songElements[j]);
                        songGroups[songSectionTitle].push(song);
                    }
                }
                return songGroups;
            }
            catch (e) {
                return null;
            }
        });
    }
    getFreshAlbums() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const html = yield axios_1.default.get(this.BASE_URL);
                const dom = (0, domParser_1.parseDom)(html.data);
                const albums = [];
                const albumElements = dom === null || dom === void 0 ? void 0 : dom.querySelectorAll(".album-card");
                if (!albumElements)
                    return;
                for (let i = 0; i < albumElements.length; i++) {
                    const album = (0, parseAlbumCardDataFromElement_1.parseAlbumCardDataFromElement)(albumElements[i]);
                    albums.push(album);
                }
                return albums;
            }
            catch (e) {
                return null;
            }
        });
    }
    getArtistDataById(artistId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const html = yield axios_1.default.get(`${this.BASE_URL}/artist/${artistId}`);
                const dom = (0, domParser_1.parseDom)(html.data);
                const artistElement = dom === null || dom === void 0 ? void 0 : dom.querySelector(".artist-page.page");
                if (!artistElement)
                    return;
                const artist = Object.assign(Object.assign({}, (0, parseArtistDataFromElement_1.parseArtistDataFromElement)(artistElement)), { id: artistId });
                return artist;
            }
            catch (e) {
                return null;
            }
        });
    }
    getAlbumDataById(albumId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const html = yield axios_1.default.get(`${this.BASE_URL}/albums/${albumId}`);
                const dom = (0, domParser_1.parseDom)(html.data);
                const albumElement = dom === null || dom === void 0 ? void 0 : dom.querySelector(".page.page_album");
                if (!albumElement)
                    return;
                const album = Object.assign(Object.assign({}, (0, parseAlbumDataFromElement_1.parseAlbumDataFromElement)(albumElement)), { id: albumId });
                return album;
            }
            catch (e) {
                return null;
            }
        });
    }
    getSearchResults(searchQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const html = yield axios_1.default.get(`${this.BASE_URL}/search?q=${searchQuery}`);
                const dom = (0, domParser_1.parseDom)(html.data);
                const songElements = dom === null || dom === void 0 ? void 0 : dom.querySelectorAll(".playlist .track.song-item");
                if (!songElements)
                    return;
                const searchResults = {
                    songs: [],
                    artists: [],
                    albums: []
                };
                for (let i = 0; i < songElements.length; i++) {
                    const song = (0, parseSongDataFromElement_1.parseSongDataFromElement)(songElements[i]);
                    searchResults.songs.push(song);
                }
                const artistElements = dom === null || dom === void 0 ? void 0 : dom.querySelectorAll(".artist-item");
                if (!artistElements)
                    return;
                for (let i = 0; i < (artistElements === null || artistElements === void 0 ? void 0 : artistElements.length); i++) {
                    const artist = (0, parseArtistSearchDataFromElement_1.parseArtistSearchDataFromElement)(artistElements[i]);
                    searchResults.artists.push(artist);
                }
                const albumElementsContainer = dom === null || dom === void 0 ? void 0 : dom.querySelectorAll(".col-xs-12")[(dom === null || dom === void 0 ? void 0 : dom.querySelectorAll(".col-xs-12").length) - 1];
                if (!albumElementsContainer)
                    return;
                const albumElements = albumElementsContainer === null || albumElementsContainer === void 0 ? void 0 : albumElementsContainer.querySelectorAll(".collection-item a");
                let requests = [];
                for (let i = 0; i < (albumElements === null || albumElements === void 0 ? void 0 : albumElements.length); i++) {
                    requests.push(axios_1.default.get(this.BASE_URL + albumElements[i].getAttribute("href")));
                }
                const albumResponses = yield Promise.all(requests);
                for (let i = 0; i < albumResponses.length; i++) {
                    const albumResponseData = albumResponses[i].data;
                    const albumElement = (_a = (0, domParser_1.parseDom)(albumResponseData)) === null || _a === void 0 ? void 0 : _a.querySelector(".page.page_album");
                    if (!albumElement)
                        continue;
                    const album = (0, parseAlbumDataFromElement_1.parseAlbumDataFromElement)(albumElement);
                    const albumId = (_b = albumElements[i].getAttribute("href")) === null || _b === void 0 ? void 0 : _b.slice(8);
                    if (!albumId)
                        continue;
                    searchResults.albums.push(Object.assign({ id: albumId }, album));
                }
                return searchResults;
            }
            catch (e) {
                return null;
            }
        });
    }
}
exports.MusicDataManager = MusicDataManager;
