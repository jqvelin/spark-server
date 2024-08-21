import { Album } from "../model/album/album.types"
import { albumSchema } from "../model/album/albumSchema"

export const parseFreshAlbumDataFromElement = (element: Element): Album => {
    const id = element.querySelector("a.album-card__image")?.getAttribute("href")?.slice(8)
    const coverSrc = element.querySelector("img.album-card__image")?.getAttribute("src") 
    const title = element.querySelector(".album-card__title")?.textContent?.trim()
    const artist = element.querySelector(".album-card__author a")?.textContent?.trim()
    return albumSchema.parse({id, coverSrc, title, artist})
}