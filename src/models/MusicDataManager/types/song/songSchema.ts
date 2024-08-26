import { z } from "zod";

export const songSchema = z.object({
    id: z.string(),
    coverSrc: z.string().or(z.null()).or(z.undefined()),
    title: z.string(),
    artist: z.string(),
    duration: z.string()
})
