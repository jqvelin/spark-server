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
exports.getHomepageSongs = void 0;
const axios_1 = __importDefault(require("axios"));
const domParser_1 = require("./domParser");
const parseSongDataFromElement_1 = require("./parseSongDataFromElement");
const getHomepageSongs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const html = yield axios_1.default.get("https://mp3party.net");
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
exports.getHomepageSongs = getHomepageSongs;
