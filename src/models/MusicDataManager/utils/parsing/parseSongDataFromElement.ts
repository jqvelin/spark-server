import { Song } from "../../types/song/song.types"
import { songSchema } from "../../types/song/songSchema"

export const parseSongDataFromElement = (element: Element): Song => {
    const id = element.querySelector(".track__user-panel")?.getAttribute("data-js-id")
    const coverSrc = element.querySelector(".track__user-panel")?.getAttribute("data-js-image") ? "https://mp3party.net/" + element.querySelector(".track__user-panel")?.getAttribute("data-js-image") : null
    const artist = element.querySelector(".track__user-panel")?.getAttribute("data-js-artist-name")
    const title = element.querySelector(".track__user-panel")?.getAttribute("data-js-song-title")
    
    const rawDuration = element.querySelectorAll(".track__info-item")[0].textContent?.trim()
    if (!rawDuration) {
        throw new Error(`Couldn't parse the duration of the track ${id}: ${artist} - ${title}`);
    }
    const [minutes, seconds] = rawDuration?.split(':').map(Number);
    if (typeof minutes === 'undefined' || typeof seconds === 'undefined') {
        throw new Error(`Couldn't parse the duration of the track ${id}: ${artist} - ${title}`)
    }
    const duration = minutes * 60 + seconds;

    return songSchema.parse({
        id,
        coverSrc,
        artist,
        title,
        duration,
    })
}