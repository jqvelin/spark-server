import { MusicDataManager } from "../MusicDataManager/MusicDataManager"
import express from "express"
const router = express.Router()

const musicDataManager = new MusicDataManager()
  
router.get('/:albumId', async (req, res) => {
    const albumId = req.params.albumId
    const album = await musicDataManager.getAlbumDataById(albumId)
    res.json(album)
})

export { router as albumsRouter }