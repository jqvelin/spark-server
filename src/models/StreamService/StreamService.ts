import axios, { CancelTokenSource } from "axios";
import type { Response } from "express";
import * as stream from "stream";

export class StreamService {
  BASE_URL = "https://dl2.mp3party.net/online";
  currentRequest: CancelTokenSource | null = null;

  async handleDownload({songId, artist, title, res}: 
    {songId: string, artist: string, title: string, res: Response}) {
        const url = `https://dl2.mp3party.net/download/${songId}`
        const filename = encodeURIComponent(`${artist} - ${title}.mp3`)
        try {
            const response = await axios.get(url, {
                responseType: 'stream',
                headers: {
                    'User-Agent': 'Mozilla/5.0', // Mimic a browser or app header
                },
            });
    
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.setHeader('Content-Type', 'audio/mpeg');
            
            response.data.pipe(res);
        } catch (error) {
            console.error("Download failed:", error);
            res.status(500).send("Download failed");
        }
}

  async stream(songId: string, range: string, res: Response) {
    if (this.currentRequest) {
      this.currentRequest.cancel("New request initiated.");
    }

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    this.currentRequest = source;

    try {
      const response = await axios.get(`${this.BASE_URL}/${songId}.mp3`, {
        responseType: "arraybuffer",
        cancelToken: source.token,
      });

      const audioBuffer = Buffer.from(response.data);
      const audioLength = audioBuffer.length;
      const [start, end] = range.replace(/bytes=/, "").split("-").map(Number);

      const startByte = start || 0;
      const endByte = end || audioLength - 1;
      const contentLength = endByte - startByte + 1;

      res.writeHead(206, {
        "Content-Range": `bytes ${startByte}-${endByte}/${audioLength}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "audio/mpeg",
      });

      const audioStream = new stream.PassThrough();
      audioStream.end(audioBuffer.slice(startByte, endByte + 1));
      audioStream.pipe(res);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Previous request canceled: ", error.message);
      } else {
        res.status(500).send("Error fetching audio");
      }
    } finally {
      this.currentRequest = null;
    }
  }
}
