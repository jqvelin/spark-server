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
exports.StreamManager = void 0;
const axios_1 = __importDefault(require("axios"));
const isUrlValid_1 = require("../../lib/isUrlValid");
const stream = __importStar(require("stream"));
class StreamManager {
    constructor(BASE_URL) {
        if (!(0, isUrlValid_1.isUrlValid)(BASE_URL)) {
            throw new Error("Invalid BASE_URL");
        }
        else {
            this.BASE_URL = BASE_URL;
        }
    }
    stream(songId, range, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.BASE_URL}/${songId}.mp3`, {
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
        });
    }
}
exports.StreamManager = StreamManager;
