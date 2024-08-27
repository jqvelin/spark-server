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
exports.songsRouter = void 0;
const MusicDataManager_1 = require("../MusicDataManager/MusicDataManager");
const express_1 = __importDefault(require("express"));
const StreamManager_1 = require("../StreamManager/StreamManager");
const router = express_1.default.Router();
exports.songsRouter = router;
const musicDataManager = new MusicDataManager_1.MusicDataManager();
const streamManager = new StreamManager_1.StreamManager();
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield musicDataManager.getHomepageSongs();
    res.json(songs);
}));
router.get('/:songId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
        return;
    }
    streamManager.stream(req.params.songId, range, res);
}));
