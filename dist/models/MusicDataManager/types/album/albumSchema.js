"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.albumSchema = void 0;
const zod_1 = require("zod");
const songSchema_1 = require("../song/songSchema");
exports.albumSchema = zod_1.z.object({
    id: zod_1.z.string(),
    coverSrc: zod_1.z.string().or(zod_1.z.undefined()).or(zod_1.z.null()),
    title: zod_1.z.string(),
    artist: zod_1.z.string().or(zod_1.z.undefined()).or(zod_1.z.null()),
    genres: zod_1.z.array(zod_1.z.string()).or(zod_1.z.null()).or(zod_1.z.undefined()),
    songs: zod_1.z.array(songSchema_1.songSchema).or(zod_1.z.null()).or(zod_1.z.undefined())
});
