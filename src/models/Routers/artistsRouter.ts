import express from "express"
import { MusicDataManager } from "../MusicDataManager/MusicDataManager"
const router = express.Router()

const musicDataManager = new MusicDataManager("https://mp3party.net")

router.get('/:artistId', async (req, res) => {
    const artistId = req.params.artistId
    const artist = await musicDataManager.getArtistDataById(artistId)
    res.json(artist)
})

export { router as artistsRouter }