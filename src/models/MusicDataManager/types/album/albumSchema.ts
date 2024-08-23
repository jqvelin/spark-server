import { z } from "zod";
import { songSchema } from "../song/songSchema";

export const albumSchema = z.object({
    id: z.string(),
    coverSrc: z.string().or(z.undefined()).or(z.null()),
    title: z.string(),
    artist: z.string().or(z.undefined()).or(z.null()),
    genres: z.array(z.string()).or(z.null()).or(z.undefined()),
    songs: z.array(songSchema).or(z.null()).or(z.undefined())
})