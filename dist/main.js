"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const stream = __importStar(require("stream"));
const getHomepageSongs_1 = require("./lib/getHomepageSongs");
const getFreshAlbums_1 = require("./lib/getFreshAlbums");
const getSearchResults_1 = require("./lib/getSearchResults");
const getAlbumDataById_1 = require("./lib/getAlbumDataById");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/songs', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield (0, getHomepageSongs_1.getHomepageSongs)();
    res.json(songs);
}));
app.get('/albums/fresh', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const albums = yield (0, getFreshAlbums_1.getFreshAlbums)();
    res.json(albums);
}));
app.get('/albums/:albumId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const albumId = req.params.albumId;
    const album = yield (0, getAlbumDataById_1.getAlbumDataById)(albumId);
    res.json(album);
}));
app.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = req.query.q;
    if (typeof searchQuery !== 'string') {
        res.sendStatus(400);
        return;
    }
    const searchResults = yield (0, getSearchResults_1.getSearchResults)(searchQuery);
    res.json(searchResults);
}));
app.get('/song/:songId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const range = req.headers.range;
        if (!range) {
            res.status(400).send("Requires Range header");
            return;
        }
        // Fetch the audio file
        const response = yield axios_1.default.get(`https://dl2.mp3party.net/online/${req.params.songId}.mp3`, {
            responseType: 'arraybuffer',
        });
        const audioBuffer = Buffer.from(response.data);
        const audioLength = audioBuffer.length;
        const [start, end] = range.replace(/bytes=/, "").split("-").map(Number);
        const startByte = start || 0;
        const endByte = end || audioLength - 1;
        const contentLength = endByte - startByte + 1;
        res.writeHead(206, {
            "Content-Range": `bytes ${startByte}-${endByte}/${audioLength}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "audio/mpeg",
        });
        const audioStream = new stream.PassThrough();
        audioStream.end(audioBuffer.slice(startByte, endByte + 1));
        audioStream.pipe(res);
    }
    catch (error) {
        res.status(500).send('Error fetching audio');
    }
}));
app.listen(3000, () => {
    console.log('Running on port 3000');
});
