"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.songSchema = void 0;
const zod_1 = require("zod");
exports.songSchema = zod_1.z.object({
    id: zod_1.z.string(),
    coverSrc: zod_1.z.string().or(zod_1.z.null()),
    title: zod_1.z.string(),
    artist: zod_1.z.string(),
    duration: zod_1.z.string()
});
