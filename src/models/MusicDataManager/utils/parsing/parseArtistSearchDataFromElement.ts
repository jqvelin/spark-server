import { artistSchema } from "../../types/artist/artistSchema"

export const parseArtistSearchDataFromElement = (element: Element) => {
    const id = element.querySelector('a')?.getAttribute("href")?.slice(8) as string
    const name = element.querySelector('a')?.textContent as string

    return artistSchema.parse({ id, name })
}