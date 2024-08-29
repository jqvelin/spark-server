"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const songsRouter_1 = require("./models/Routers/songsRouter");
const albumsRouter_1 = require("./models/Routers/albumsRouter");
const searchRouter_1 = require("./models/Routers/searchRouter");
const artistsRouter_1 = require("./models/Routers/artistsRouter");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/artists', artistsRouter_1.artistsRouter);
app.use('/songs', songsRouter_1.songsRouter);
app.use('/albums', albumsRouter_1.albumsRouter);
app.use('/search', searchRouter_1.searchRouter);
app.listen(3000, () => {
    console.log('Running on port 3000');
});