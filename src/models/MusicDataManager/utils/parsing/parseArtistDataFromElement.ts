import { Album } from "../../types/album/album.types"
import { Artist } from "../../types/artist/artist.types"
import { Song } from "../../types/song/song.types"
import { parseAlbumDataFromElement } from "./parseAlbumDataFromElement"
import { parseSongDataFromElement } from "./parseSongDataFromElement"

export const parseArtistDataFromElement = (element: Element): Omit<Artist, "id"> => {
    const name = element.querySelector(".page__title")?.textContent?.trim().slice(0, -12) as string
    const imageSrc = element.querySelector("img.artist-image")?.getAttribute("src")
    
    const songs: Song[] = []
    const songElements = element.querySelectorAll('.playlist .track.song-item')

    for (let i = 0; i < songElements.length; i++) {
        const song = parseSongDataFromElement(songElements[i])
        songs.push(song)
    }

    const albums: Album[] = []

    // First album element appears on desktop, the second one - on mobile
    const albumElementsWithDuplicates = Array.from(element.querySelectorAll('.album-card'))
    const albumElements = albumElementsWithDuplicates.reduce((acc, albumElement) => {
        const accIds = acc.map(accElement => accElement.querySelector("a.album-card__image")?.getAttribute("href")?.slice(8))
        const albumElementId = albumElement.querySelector("a.album-card__image")?.getAttribute("href")?.slice(8)
        if (!albumElementId || !accIds.includes(albumElementId)) {
            acc.push(albumElement)
        }
        return acc
    }, [] as Element[])
    for (let i = 0; i < albumElements.length; i++) {
        const album = parseAlbumDataFromElement(albumElements[i])
        albums.push({
            id: albumElements[i].querySelector("a.album-card__image")?.getAttribute("href")?.slice(8) as string,
            ...album
        })
    }
    
    return {
        name,
        imageSrc,
        songs,
        albums
    }
}