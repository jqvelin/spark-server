import express from "express"
import { MusicDataManager } from "../MusicDataManager/MusicDataManager"
import { playlistSchema } from "../MusicDataManager/types/playlist/playlistSchema"
const router = express.Router()

const musicDataManager = new MusicDataManager()

router.post('/add', async (req, res) => {
    try {
        const playlist = playlistSchema.parse(req.body)
        const response = await musicDataManager.addPlaylistToUserPlaylists(playlist)
        res.sendStatus(response.status)
    } catch {
        res.sendStatus(500)
    }
})
export { router as playlistsRouter }