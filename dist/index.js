"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const songsRouter_1 = require("./models/Routers/songsRouter");
const albumsRouter_1 = require("./models/Routers/albumsRouter");
const searchRouter_1 = require("./models/Routers/searchRouter");
const artistsRouter_1 = require("./models/Routers/artistsRouter");
const playlistsRouter_1 = require("./models/Routers/playlistsRouter");
const downloadRouter_1 = require("./models/Routers/downloadRouter");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/artists', artistsRouter_1.artistsRouter);
app.use('/songs', songsRouter_1.songsRouter);
app.use('/albums', albumsRouter_1.albumsRouter);
app.use('/search', searchRouter_1.searchRouter);
app.use('/playlists', playlistsRouter_1.playlistsRouter);
app.use('/download', downloadRouter_1.downloadRouter);
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
