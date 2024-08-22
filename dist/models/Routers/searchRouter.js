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
exports.searchRouter = void 0;
const express_1 = __importDefault(require("express"));
const MusicDataManager_1 = require("../MusicDataManager/MusicDataManager");
const router = express_1.default.Router();
exports.searchRouter = router;
const musicDataManager = new MusicDataManager_1.MusicDataManager("https://mp3party.net");
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = req.query.q;
    if (typeof searchQuery !== 'string') {
        res.sendStatus(400);
        return;
    }
    const searchResults = yield musicDataManager.getSearchResults(searchQuery);
    res.json(searchResults);
}));
