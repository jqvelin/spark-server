"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.albumSchema = void 0;
const zod_1 = require("zod");
const songSchema_1 = require("../song/songSchema");
exports.albumSchema = zod_1.z.object({
    id: zod_1.z.string(),
    coverSrc: zod_1.z.string().optional().or(zod_1.z.null()),
    title: zod_1.z.string(),
    /* Weird null chaining is related to a bug on external service's side
       Sometimes the following fields are missing
       Not sure why ¯\_(ツ)_/¯
    */
    artist: zod_1.z.string().optional().or(zod_1.z.null()),
    artistId: zod_1.z.string().optional().or(zod_1.z.null()),
    songs: zod_1.z.array(songSchema_1.songSchema).optional().or(zod_1.z.null()),
    genres: zod_1.z.array(zod_1.z.string()).optional().or(zod_1.z.null()),
});
