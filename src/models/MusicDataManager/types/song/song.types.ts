import { z } from "zod"
import { songSchema } from "./songSchema"

export type Song = z.infer<typeof songSchema>

export type SongGroups = {
    fresh: Song[],
    trendingWorldwide: Song[],
    bestOfToday: Song[],
    trendingRussia: Song[]
}

export type SongGroupTitles = (keyof SongGroups)[]