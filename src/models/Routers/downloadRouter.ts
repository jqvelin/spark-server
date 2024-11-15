import { Router, type Request, type Response } from "express"
import { StreamService } from "../StreamService/StreamService";

const streamService = new StreamService()

const router = Router()
router.get('/:songId', async (req: Request, res: Response) => {
    const { songId } = req.params,
    {artist, title} = req.query as {artist: string, title: string}
    streamService.handleDownload({songId, artist, title, res})
});

export { router as downloadRouter }