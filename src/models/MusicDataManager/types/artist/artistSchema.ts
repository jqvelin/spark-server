import { z } from "zod";
import { songSchema } from "../song/songSchema";
import { albumSchema } from "../album/albumSchema";

export const artistSchema = z.object({
    id: z.string(),
    name: z.string(),
    imageSrc: z.string().or(z.undefined()).or(z.null()),
    songs: z.array(songSchema).or(z.undefined()).or(z.null()),
    albums: z.array(albumSchema).or(z.undefined()).or(z.null())
})