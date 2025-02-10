import express from "express"
import { StreamService } from "../StreamService/StreamService"
const router = express.Router()

const streamManager = new StreamService()

router.get('/:songId', async (req, res) => {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
        return;
    }

    streamManager.stream(req.params.songId, range, res);
});

export { router as songsRouter }