import { z } from "zod";
import { songSchema } from "../song/songSchema";

export const playlistSchema = z.object({
    userId: z.string(),
    playlistId: z.string(),
    title: z.string(),
    description: z.string().optional().or(z.null()),
    songs: z.array(songSchema),
})