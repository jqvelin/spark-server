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
exports.playlistsRouter = void 0;
const express_1 = __importDefault(require("express"));
const MusicDataManager_1 = require("../MusicDataManager/MusicDataManager");
const playlistSchema_1 = require("../MusicDataManager/types/playlist/playlistSchema");
const router = express_1.default.Router();
exports.playlistsRouter = router;
const musicDataManager = new MusicDataManager_1.MusicDataManager();
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playlist = playlistSchema_1.playlistSchema.omit({ id: true }).parse(req.body);
        const response = yield musicDataManager.addPlaylist(playlist);
        res.sendStatus(response.status);
    }
    catch (_a) {
        res.sendStatus(500);
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchParams = new URLSearchParams(req.query).toString();
        const playlists = yield musicDataManager.getPlaylists(searchParams);
        res.json(playlists);
    }
    catch (_a) {
        res.sendStatus(400);
    }
}));
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playlist = playlistSchema_1.playlistSchema.parse(req.body);
        const response = yield musicDataManager.patchPlaylist(playlist);
        res.sendStatus(response.status);
    }
    catch (_a) {
        res.sendStatus(500);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playlistId = req.params.id;
        const response = yield musicDataManager.removePlaylist(playlistId);
        res.sendStatus(response.status);
    }
    catch (_a) {
        res.sendStatus(500);
    }
}));
