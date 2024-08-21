import axios from "axios"
import { parseDom } from "./domParser"
import { parseSongDataFromElement } from "./parseSongDataFromElement"

export const getSearchResults = async (searchQuery: string) => {
    try {
        const html = await axios.get(`https://mp3party.net/search?q=${searchQuery}`)
        const dom = parseDom(html.data)
        const songElements = dom?.querySelectorAll(".playlist .track.song-item")
        if (!songElements) return

        const searchResults = []

        for (let i = 0; i < songElements.length; i++) {
            const song = parseSongDataFromElement(songElements[i])
            searchResults.push(song)
        }

        return searchResults
    } catch (e) {
        return null
    }
}