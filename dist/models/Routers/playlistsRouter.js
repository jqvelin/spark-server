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
        const playlist = playlistSchema_1.playlistSchema.parse(req.body);
        const response = yield musicDataManager.addPlaylistToUserPlaylists(playlist);
        res.sendStatus(response.status);
    }
    catch (_a) {
        res.sendStatus(500);
    }
}));
