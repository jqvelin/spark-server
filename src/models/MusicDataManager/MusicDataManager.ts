import axios from "axios"
import { isValidUrl } from "../../lib/isValidUrl"
import { Song, SongGroups, SongGroupTitles } from "./types/song/song.types"
import { parseSongDataFromElement } from "./utils/parsing/parseSongDataFromElement"
import { parseDom } from "../../lib/domParser"
import { Album } from "./types/album/album.types"
import { parseFreshAlbumDataFromElement } from "./utils/parsing/parseFreshAlbumDataFromElement"

export class MusicDataManager {
    BASE_URL: string

    constructor(BASE_URL: string){
        if (!isValidUrl(BASE_URL)) {
            throw new Error("Invalid BASE_URL")
        } else {
            this.BASE_URL = BASE_URL
        }
    }

    async getHomepageSongs() {
        try {
            const html = await axios.get(this.BASE_URL)
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

    async getFreshAlbums() {
        try {
            const html = await axios.get(this.BASE_URL)
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

    async getAlbumDataById(albumId: string) {
        try {
            const html = await axios.get(`${this.BASE_URL}/albums/${albumId}`)
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

    async getSearchResults(searchQuery: string) {
        try {
            const html = await axios.get(`${this.BASE_URL}/search?q=${searchQuery}`)
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
}