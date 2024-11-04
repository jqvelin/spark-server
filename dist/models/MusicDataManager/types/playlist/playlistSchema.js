"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistSchema = void 0;
const zod_1 = require("zod");
const songSchema_1 = require("../song/songSchema");
exports.playlistSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string().optional().or(zod_1.z.null()),
    songs: zod_1.z.array(songSchema_1.songSchema),
});
