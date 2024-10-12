import { z } from "zod";

export const songSchema = z.object({
    id: z.string(),
    coverSrc: z.string().optional().or(z.null()),
    title: z.string(),
    artist: z.string(),
    duration: z.string()
})
