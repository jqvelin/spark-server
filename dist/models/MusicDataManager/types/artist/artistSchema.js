"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artistSchema = void 0;
const zod_1 = require("zod");
const songSchema_1 = require("../song/songSchema");
const albumSchema_1 = require("../album/albumSchema");
exports.artistSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    songs: zod_1.z.array(songSchema_1.songSchema).or(zod_1.z.undefined()).or(zod_1.z.null()),
    albums: zod_1.z.array(albumSchema_1.albumSchema).or(zod_1.z.undefined()).or(zod_1.z.null())
});
