import axios from "axios"
import { parseDom } from "./domParser"
import { Album } from "../model/album/album.types"
import { Song } from "../model/song/song.types"
import { parseSongDataFromElement } from "./parseSongDataFromElement"

export const getAlbumDataById = async (albumId: string) => {
    try {
        const html = await axios.get(`https://mp3party.net/albums/${albumId}`)
        const dom = parseDom(html.data)
        const title = dom?.querySelector(".page__title.page__title_album")?.textContent?.trim() as string
        const artist = dom?.querySelector(".same-artist__item a")?.textContent?.trim() as string
        const coverSrc = dom?.querySelector("img.page__img")?.getAttribute("src") as string

        const songs: Song[] = []

        const songElements = dom?.querySelectorAll('.playlist .track.song-item')
        if (!songElements) return 

        for (let i = 0; i < songElements.length; i++) {
            const song = parseSongDataFromElement(songElements[i])
            songs.push(song)
        }

        const album: Album = {
            id: albumId,
            coverSrc,
            title,
            artist,
            songs,
        }

        return album
    } catch (e) {
        return null
    }
}