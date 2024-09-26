import { Album } from "../../types/album/album.types"
import { albumSchema } from "../../types/album/albumSchema"
import { Song } from "../../types/song/song.types"
import { parseSongDataFromElement } from "./parseSongDataFromElement"

export const parseAlbumDataFromElement = (element: Element): Omit<Album, "id"> => {
    const albumCardId = element.querySelector("a.album-card__image")?.getAttribute("href")?.slice(8)
    // Checking if it's an album card that should lead to album page, so there is no need to fetch it's content
    if (albumCardId) {
        const coverSrc = element.querySelector("img.album-card__image")?.getAttribute("src") 
        const title = element.querySelector(".album-card__title")?.textContent?.trim()
        const artist = element.querySelector(".album-card__author a")?.textContent?.trim()
        const artistId = element.querySelector(".album-card__author a")?.getAttribute("href")?.slice(8).trim()
        return albumSchema.parse({id: albumCardId, coverSrc, title, artist, artistId})
    }

    const title = element.querySelector(".page__title.page__title_album")?.textContent?.trim() as string
    const artist = element.querySelector(".same-artist__item a")?.textContent?.trim() as string
    const artistId = element.querySelector(".same-artist__item a")?.getAttribute("href")?.slice(8).trim() as string
    const coverSrc = element.querySelector("img.page__img")?.getAttribute("src") as string

    const songs: Song[] = []
    
    const songElements = element?.querySelectorAll('.playlist .track.song-item')

    for (let i = 0; i < songElements.length; i++) {
        const song = parseSongDataFromElement(songElements[i])
        songs.push(song)
    }

    const genres: string[] = []
    const genreElements = element.querySelectorAll(".badge-item.badge-item_artist")

    for (let i = 0; i < genreElements.length; i++) {
        const genre = genreElements[i].textContent?.trim()
        if (!genre) continue
        genres.push(genre)
    }

    // Id is not present in DOM, but comes from parental method
    return albumSchema.omit({id: true}).parse({
        title,
        artist,
        artistId,
        coverSrc,
        songs,
        genres
    })
}