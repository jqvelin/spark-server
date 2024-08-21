import axios from "axios"
import { parseDom } from "./domParser"
import { Album } from "../model/album/album.types"
import { parseFreshAlbumDataFromElement } from "./parseFreshAlbumDataFromElement"

export const getFreshAlbums = async () => {
    try {
        const html = await axios.get("https://mp3party.net")
        const dom = parseDom(html.data)
        
        const albums: Album[] = []

        const albumElements = dom?.querySelectorAll(".album-card")
        if (!albumElements) return 
        
        for (let i = 0; i < albumElements.length; i++) {
            const album = parseFreshAlbumDataFromElement(albumElements[i])
            albums.push(album)
        }        

        return albums

    } catch (e) {
        return null
    }
}