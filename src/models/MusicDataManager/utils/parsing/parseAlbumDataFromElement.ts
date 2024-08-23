import { Album } from "../../types/album/album.types"
import { albumSchema } from "../../types/album/albumSchema"
import { Song } from "../../types/song/song.types"
import { parseSongDataFromElement } from "./parseSongDataFromElement"

export const parseAlbumDataFromElement = (element: Element): Omit<Album, "id"> => {
    const title = element?.querySelector(".page__title.page__title_album")?.textContent?.trim() as string
    const artist = element?.querySelector(".same-artist__item a")?.textContent?.trim() as string
    const coverSrc = element?.querySelector("img.page__img")?.getAttribute("src") as string

    const songs: Song[] = []
    
    const songElements = element?.querySelectorAll('.playlist .track.song-item')

    for (let i = 0; i < songElements.length; i++) {
        const song = parseSongDataFromElement(songElements[i])
        songs.push(song)
    }

    return albumSchema.omit({id: true}).parse({
        title,
        artist,
        coverSrc,
        songs
    })
}