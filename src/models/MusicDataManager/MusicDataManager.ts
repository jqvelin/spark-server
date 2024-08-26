import axios from "axios"
import { isUrlValid } from "../../lib/isUrlValid"
import { Song, SongGroups, SongGroupTitles } from "./types/song/song.types"
import { parseSongDataFromElement } from "./utils/parsing/parseSongDataFromElement"
import { parseDom } from "../../lib/domParser"
import { Album } from "./types/album/album.types"
import { Artist } from "./types/artist/artist.types"
import { parseAlbumDataFromElement } from "./utils/parsing/parseAlbumDataFromElement"
import { parseArtistDataFromElement } from "./utils/parsing/parseArtistDataFromElement"

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

            for (let i = 0; i < albumElements?.length; i++) {
                const album = parseAlbumDataFromElement(albumElements[i])
                albums.push(album as Album)
            }
            
            return albums
        } catch (e) {
            return null
        }
    }

    async getArtistDataById(artistId: string): Promise<Artist | null | undefined> {
        try {
            const html = await axios.get(`${this.BASE_URL}/artist/${artistId}`)
            const dom = parseDom(html.data)
            const artistElement = dom?.querySelector(".artist-page.page")
            if (!artistElement) return
            
            const artist: Artist = {
                ...parseArtistDataFromElement(artistElement),
                id: artistId
            }
            
            return artist            
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
                artists: Artist[],
                albums: Album[]
            } = {
                songs: [],
                artists: [],
                albums: []
            }
    
            for (let i = 0; i < songElements.length; i++) {
                const song = parseSongDataFromElement(songElements[i])
                searchResults.songs.push(song)
            }

            const artistElements = dom?.querySelectorAll(".artist-item a")
            if (!artistElements) return

            let artistDataRequests = []
            for (let i = 0; i < artistElements?.length; i++) {
                artistDataRequests.push(axios.get(this.BASE_URL + artistElements[i].getAttribute("href")))
            }
            const artistResponses = await Promise.all(artistDataRequests)
            for (let i = 0; i < artistResponses.length; i++) {
                const artistResponseData = artistResponses[i].data
                const artistElement = parseDom(artistResponseData)?.querySelector(".artist-page.page")
                if (!artistElement) continue
                const artist = parseArtistDataFromElement(artistElement)
                const artistId = artistElements[i].getAttribute("href")?.slice(8)
                if (!artistId) continue
                searchResults.artists.push({
                    id: artistId,
                    ...artist
                })
            }

            const albumElementsContainer = dom?.querySelectorAll(".col-xs-12")[dom?.querySelectorAll(".col-xs-12").length - 1]
            if (!albumElementsContainer) return

            const albumElements = albumElementsContainer?.querySelectorAll(".collection-item a")
            let albumDataRequests = []
            for (let i = 0; i < albumElements?.length; i++) {
                albumDataRequests.push(axios.get(this.BASE_URL + albumElements[i].getAttribute("href")))
            }
            const albumResponses = await Promise.all(albumDataRequests)

            for (let i = 0; i < albumResponses.length; i++) {
                const albumResponseData = albumResponses[i].data
                const albumElement = parseDom(albumResponseData)?.querySelector(".page.page_album")
                if (!albumElement) continue
                const album = parseAlbumDataFromElement(albumElement)

                const albumId = albumElements[i].getAttribute("href")?.slice(8)
                if (!albumId) continue
                searchResults.albums.push({
                    id: albumId,
                    ...album
                })
            }

            return searchResults
        } catch (e) {
            return null
        }
    }
}