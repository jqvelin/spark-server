import { Album } from "../../types/album/album.types"
import { Artist } from "../../types/artist/artist.types"
import { Song } from "../../types/song/song.types"
import { parseAlbumCardDataFromElement } from "./parseAlbumCardDataFromElement"
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
    const albumElements = element.querySelectorAll('.album-card')

    for (let i = 0; i < albumElements.length; i++) {
        const album = parseAlbumCardDataFromElement(albumElements[i])
        albums.push(album)
    }
    
    return {
        name,
        imageSrc,
        songs,
        albums
    }

}