import axios from "axios"
import { parseDom } from "./domParser"
import { parseSongDataFromElement } from "./parseSongDataFromElement"
import { SongGroups, SongGroupTitles } from "../model/song/song.types"

export const getHomepageSongs = async () => {
    try {
        const html = await axios.get("https://mp3party.net")
        const dom = parseDom(html.data)
        
        const songGroups: SongGroups = {
            fresh: [],
            trendingGlobal: [],
            bestOfToday: [],
            trendingRussia: []
        }

        const songSectionElements = dom?.querySelectorAll(".playlist")
        if (!songSectionElements) return 
        const songSectionIndices: SongGroupTitles = ["fresh", "bestOfToday", "trendingGlobal", "trendingRussia"]
        
        for (let i = 0; i < songSectionIndices.length; i++) {
            const [songSectionTitle, songSectionElement] = [songSectionIndices[i], songSectionElements[i]]
            const songElements = songSectionElement.querySelectorAll('.track.song-item')
            for (let j = 0; j < songElements.length; j++) {
                const song = parseSongDataFromElement(songElements[j])
                songGroups[songSectionTitle].push(song)
            }
        }

        return songGroups

    } catch (e) {
        return null
    }
}