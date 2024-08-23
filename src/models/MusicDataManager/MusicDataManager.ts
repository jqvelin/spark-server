import axios from "axios"
import { isUrlValid } from "../../lib/isUrlValid"
import { Song, SongGroups, SongGroupTitles } from "./types/song/song.types"
import { parseSongDataFromElement } from "./utils/parsing/parseSongDataFromElement"
import { parseDom } from "../../lib/domParser"
import { Album } from "./types/album/album.types"
import { parseFreshAlbumDataFromElement } from "./utils/parsing/parseFreshAlbumDataFromElement"
import { Artist } from "./types/artist/artist.types"
import { parseArtistSearchDataFromElement } from "./utils/parsing/parseArtistSearchDataFromElement"
import { parseAlbumDataFromElement } from "./utils/parsing/parseAlbumDataFromElement"

export class MusicDataManager {
    BASE_URL: string

    constructor(BASE_URL: string){
        if (!isUrlValid(BASE_URL)) {
            throw new Error("Invalid BASE_URL")
        } else {
            this.BASE_URL = BASE_URL
        }
    }

    async getHomepageSongs(): Promise<SongGroups | null | undefined> {
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

    async getFreshAlbums(): Promise<Album[] | null | undefined> {
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

    async getAlbumDataById(albumId: string): Promise<Album | null | undefined> {
        try {
            const html = await axios.get(`${this.BASE_URL}/albums/${albumId}`)
            const dom = parseDom(html.data)
            const albumElement = dom?.querySelector(".page.page_album")
            if (!albumElement) return
            
            const album: Album = {
                ...parseAlbumDataFromElement(albumElement),
                id: albumId,
            }

            return album
        } catch (e) {
            return null
        }
    }

    async getSearchResults(searchQuery: string): Promise<{
        songs: Song[],
        artists: Artist[]
    } | null | undefined> {
        try {
            const html = await axios.get(`${this.BASE_URL}/search?q=${searchQuery}`)
            const dom = parseDom(html.data)
            const songElements = dom?.querySelectorAll(".playlist .track.song-item")
            if (!songElements) return
    
            const searchResults: {
                songs: Song[],
                artists: Artist[]
            } = {
                songs: [],
                artists: []
            }
    
            for (let i = 0; i < songElements.length; i++) {
                const song = parseSongDataFromElement(songElements[i])
                searchResults.songs.push(song)
            }

            const artistElements = dom?.querySelectorAll(".artist-item")
            if (!artistElements) return

            for (let i = 0; i < artistElements?.length; i++) {
                const artist = parseArtistSearchDataFromElement(artistElements[i])
                searchResults.artists.push(artist)
            }
    
            return searchResults
        } catch (e) {
            return null
        }
    }
}