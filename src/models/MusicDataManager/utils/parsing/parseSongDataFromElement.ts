import { Song } from "../../types/song/song.types"
import { songSchema } from "../../types/song/songSchema"

export const parseSongDataFromElement = (element: Element): Song => {
    const id = element.querySelector(".track__user-panel")?.getAttribute("data-js-id")
    const coverSrc = element.querySelector(".track__user-panel")?.getAttribute("data-js-image") ? "https://mp3party.net/" + element.querySelector(".track__user-panel")?.getAttribute("data-js-image") : null
    const artist = element.querySelector(".track__user-panel")?.getAttribute("data-js-artist-name")
    const title = element.querySelector(".track__user-panel")?.getAttribute("data-js-song-title")
    const duration = element.querySelectorAll(".track__info-item")[0].textContent?.trim()
    return songSchema.parse({
        id,
        coverSrc,
        artist,
        title,
        duration,
    })
}