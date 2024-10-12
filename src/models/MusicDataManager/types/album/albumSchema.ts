import { z } from "zod";
import { songSchema } from "../song/songSchema";

export const albumSchema = z.object({
    id: z.string(),
    coverSrc: z.string().optional().or(z.null()),
    title: z.string(),
    
    /* Weird null chaining is related to a bug on external service's side
       Sometimes the following fields are missing
       Not sure why ¯\_(ツ)_/¯
    */
    artist: z.string().optional().or(z.null()),
    artistId: z.string().optional().or(z.null()),
    songs: z.array(songSchema).optional().or(z.null()),

    genres: z.array(z.string()).optional().or(z.null()),
})