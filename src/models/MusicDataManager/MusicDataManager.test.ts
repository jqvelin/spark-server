import { describe, expect, test } from "@jest/globals";
import { MusicDataManager } from "./MusicDataManager"
import { Playlist } from "./types/playlist/playlist.types";
import "dotenv/config"
import axios from "axios";
import { playlistSchema } from "./types/playlist/playlistSchema";

const musicDataManager = new MusicDataManager()

describe("MusicDataManager happy cases", () => {
    test("Returns homepage songs section content", async () => {
        const songs = await musicDataManager.getHomepageSongs()

        expect(songs).not.toEqual({})

        expect(songs).not.toEqual({
            fresh: [],
            trendingGlobal: [],
            bestOfToday: [],
            trendingRussia: []
        })

    })

    test("Returns fresh albums section content", async () => {
        const albums = await musicDataManager.getFreshAlbums()
        expect(albums?.length).not.toBe(0)
    })

    test("Returns artist page data", async () => {
        const artistPageData = await musicDataManager.getArtistDataById("902")

        expect(artistPageData).not.toEqual({})

        expect(artistPageData).not.toEqual({
            id: "902",
            name: "",
            imageSrc: "",
            songs: [],
            albums: []
        })
    })

    test("Returns album page data", () => {
        const albumPageData = musicDataManager.getAlbumDataById("742")

        expect(albumPageData).not.toEqual({})

        expect(albumPageData).not.toEqual({
            id: "742",
            title: undefined,
            artist: undefined,
            coverSrc: undefined,
            songs: [],
            genres: []
        })
    })

    test("Returns expected search results", async () => {
        const searchResults = await musicDataManager.getSearchResults("ATL")

        expect(searchResults).not.toEqual({})

        expect(searchResults).not.toEqual({
            songs: [],
            artists: [],
            albums: []
        })
    })

    const playlist: Playlist = {
        userId: "test-user",
        id: "test-playlist",
        title: "My playlist",
        songs: []
    }

    test("correctly gets playlist data", async () => {
        const playlists = await musicDataManager.getPlaylists()
        expect(Array.isArray(playlists)).toBe(true)
    })

    test("correctly adds playlist to user playlists", async () => {
        await musicDataManager.addPlaylist(playlist)
        const dbResponse = await axios.get(`${process.env.DB_BASE_API}/playlists`)
        const playlists = playlistSchema.array().parse(dbResponse.data)
        expect(playlists.find(playlist => playlist.id === "test-playlist")).toBeDefined()
    })
    
    test("correctly adds songs to playlist", async () => {
        await musicDataManager.patchPlaylist({...playlist, songs: [...playlist.songs, {id: "test-song", title: "test song title", artist: "test artist", duration: "01:00"}]})
        const dbResponse = await axios.get(`${process.env.DB_BASE_API}/playlists`)
        const playlists = playlistSchema.array().parse(dbResponse.data)
        expect(playlists.find(playlist => playlist.id === "test-playlist")?.songs.find(song => song.id === "test-song")).toBeDefined()
    })

    test("correctly removes playlists", async () => {
        await musicDataManager.removePlaylist(playlist.id)
        const dbResponse = await axios.get(`${process.env.DB_BASE_API}/playlists`)
        const playlists = playlistSchema.array().parse(dbResponse.data)
        expect(playlists.find(playlist => playlist.id === "test-playlist")).not.toBeDefined()
    })
})