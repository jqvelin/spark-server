import { z } from "zod";
import { artistSchema } from "./artistSchema";

export type Artist = z.infer<typeof artistSchema>;