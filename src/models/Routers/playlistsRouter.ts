import express from "express"
import { MusicDataManager } from "../MusicDataManager/MusicDataManager"
import { playlistSchema } from "../MusicDataManager/types/playlist/playlistSchema"
const router = express.Router()

const musicDataManager = new MusicDataManager()

router.post('/add', async (req, res) => {
    try {
        const playlist = playlistSchema.omit({id: true}).parse(req.body)
        const response = await musicDataManager.addPlaylist(playlist)
        res.sendStatus(response.status)
    } catch {
        res.sendStatus(500)
    }
})

router.get('/', async (req, res) => {
    try {
        const searchParams = new URLSearchParams(req.query as Record<string, string>).toString()
        const playlists = await musicDataManager.getPlaylists(searchParams)
        res.json(playlists)
    } catch {
        res.sendStatus(400)
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const playlist = playlistSchema.parse(req.body)
        const response = await musicDataManager.patchPlaylist(playlist)
        res.sendStatus(response.status)
    } catch {
        res.sendStatus(500)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const playlistId = req.params.id
        const response = await musicDataManager.removePlaylist(playlistId)
        res.sendStatus(response.status)
    } catch {
        res.sendStatus(500)
    }
})
export { router as playlistsRouter }