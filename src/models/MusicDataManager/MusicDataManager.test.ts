import { describe, expect, test } from "@jest/globals";
import { MusicDataManager } from "./MusicDataManager"

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
})