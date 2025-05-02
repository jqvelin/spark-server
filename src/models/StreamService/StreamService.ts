import axios, { CancelTokenSource } from "axios";
import type { Response } from "express";
import * as stream from "stream";
import { Song } from "../MusicDataManager/types/song/song.types";

export class StreamService {
  BASE_URL = "https://dl1.mp3party.net/online";
  currentRequest: CancelTokenSource | null = null;

  async handleDownload({songId, artist, title, res}: 
    {songId: string, artist: string, title: string, res: Response}) {
        try {
          const permissions = await getSongPermissions(songId)
          if (!permissions[0].downloadable) throw "Not allowed to download";
        } catch (e) {
          return res.sendStatus(403);
        }

        const url = `https://dl2.mp3party.net/download/${songId}`
        const filename = encodeURIComponent(`${artist} - ${title}.mp3`)
        try {
            const response = await axios.get(url, {
                responseType: 'stream',
                headers: {
                    'User-Agent': 'Mozilla/5.0',
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
      try {
        const permissions = await getSongPermissions(songId)
        if (!permissions[0].playable) throw "Not allowed to play";
      } catch (e) {
        return res.sendStatus(403);
      }
    
      try {
        const response = await axios.get(`${this.BASE_URL}/${songId}.mp3`, {
        responseType: "arraybuffer",
        headers: {
          "User-Agent": "Mozilla/5.0",
        }
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
      } catch (e) {
        res.sendStatus(500);
      }
    
  }
}

async function getSongPermissions(...songIds: Song["id"][]) {
  const response = await axios.post<{id: string, downloadable: boolean, playable: boolean}[]>("https://mp3party.net/song_permissions/", {ids: songIds}, {
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
  })
  return response.data
}
