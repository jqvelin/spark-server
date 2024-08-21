import { z } from "zod";
import { albumSchema } from "./albumSchema";

export type Album = z.infer<typeof albumSchema>