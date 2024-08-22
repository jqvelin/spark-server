import { MusicDataManager } from "../MusicDataManager/MusicDataManager"
import express from "express"
import { StreamManager } from "../StreamManager/StreamManager"
const router = express.Router()

const musicDataManager = new MusicDataManager("https://mp3party.net")
const streamManager = new StreamManager("https://dl2.mp3party.net/online")

router.get('/', async (_, res) => {
    const songs = await musicDataManager.getHomepageSongs()
    res.json(songs)
})

router.get('/:songId', async (req, res) => {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
        return;
    }

    streamManager.stream(req.params.songId, range, res);
});

export { router as songsRouter }