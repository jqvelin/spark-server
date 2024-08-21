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
exports.getSearchResults = void 0;
const axios_1 = __importDefault(require("axios"));
const domParser_1 = require("./domParser");
const parseSongDataFromElement_1 = require("./parseSongDataFromElement");
const getSearchResults = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const html = yield axios_1.default.get(`https://mp3party.net/search?q=${searchQuery}`);
        const dom = (0, domParser_1.parseDom)(html.data);
        const songElements = dom === null || dom === void 0 ? void 0 : dom.querySelectorAll(".playlist .track.song-item");
        if (!songElements)
            return;
        const searchResults = [];
        for (let i = 0; i < songElements.length; i++) {
            const song = (0, parseSongDataFromElement_1.parseSongDataFromElement)(songElements[i]);
            searchResults.push(song);
        }
        return searchResults;
    }
    catch (e) {
        return null;
    }
});
exports.getSearchResults = getSearchResults;
