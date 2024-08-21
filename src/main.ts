import axios from "axios";
import express from "express";
import cors from "cors"
import * as stream from 'stream';
import { getHomepageSongs } from "./lib/getHomepageSongs";
import { getFreshAlbums } from "./lib/getFreshAlbums";
import { getSearchResults } from "./lib/getSearchResults";
import { getAlbumDataById } from "./lib/getAlbumDataById";

const app = express();
app.use(cors())

app.get('/songs', async (_, res) => {
  const songs = await getHomepageSongs()
  res.json(songs)
})

app.get('/albums/fresh', async (_, res) => {
  const albums = await getFreshAlbums()
  res.json(albums)
})

app.get('/albums/:albumId', async (req, res) => {
  const albumId = req.params.albumId
  const album = await getAlbumDataById(albumId)
  res.json(album)
})

app.get('/search', async (req, res) => {
  const searchQuery = req.query.q
  if (typeof searchQuery !== 'string') {
    res.sendStatus(400)
    return
  }
  const searchResults = await getSearchResults(searchQuery)
  res.json(searchResults)
})

app.get('/song/:songId', async (req, res) => {
  try {
    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
      return;
    }

    // Fetch the audio file
    const response = await axios.get(`https://dl2.mp3party.net/online/${req.params.songId}.mp3`, {
      responseType: 'arraybuffer',
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
    res.status(500).send('Error fetching audio');
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});