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
exports.getFreshAlbums = void 0;
const axios_1 = __importDefault(require("axios"));
const domParser_1 = require("./domParser");
const parseFreshAlbumDataFromElement_1 = require("./parseFreshAlbumDataFromElement");
const getFreshAlbums = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const html = yield axios_1.default.get("https://mp3party.net");
        const dom = (0, domParser_1.parseDom)(html.data);
        const albums = [];
        const albumElements = dom === null || dom === void 0 ? void 0 : dom.querySelectorAll(".album-card");
        if (!albumElements)
            return;
        for (let i = 0; i < albumElements.length; i++) {
            const album = (0, parseFreshAlbumDataFromElement_1.parseFreshAlbumDataFromElement)(albumElements[i]);
            albums.push(album);
        }
        return albums;
    }
    catch (e) {
        return null;
    }
});
exports.getFreshAlbums = getFreshAlbums;
