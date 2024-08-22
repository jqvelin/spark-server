import express from "express"
import { MusicDataManager } from "../MusicDataManager/MusicDataManager"
const router = express.Router()

const musicDataManager = new MusicDataManager("https://mp3party.net")

router.get('/', async (req, res) => {
    const searchQuery = req.query.q
    if (typeof searchQuery !== 'string') {
      res.sendStatus(400)
      return
    }
    const searchResults = await musicDataManager.getSearchResults(searchQuery)
    res.json(searchResults)
})

export { router as searchRouter }