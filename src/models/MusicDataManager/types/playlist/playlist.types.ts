import { z } from "zod";
import { playlistSchema } from "./playlistSchema";

export type Playlist = z.infer<typeof playlistSchema>