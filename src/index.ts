import "dotenv/config"
import express from "express";
import cors from "cors"
import { songsRouter } from "./models/Routers/songsRouter";
import { albumsRouter } from "./models/Routers/albumsRouter";
import { searchRouter } from "./models/Routers/searchRouter";
import { artistsRouter } from "./models/Routers/artistsRouter";
import { playlistsRouter } from "./models/Routers/playlistsRouter";
import { downloadRouter } from "./models/Routers/downloadRouter";
import { MusicDataManager } from "./models/MusicDataManager/MusicDataManager";

const app = express()
app.use(cors())
app.use(express.json())

app.use('/artists', artistsRouter)
app.use('/songs', songsRouter)
app.use('/albums', albumsRouter)
app.use('/search', searchRouter)
app.use('/playlists', playlistsRouter)
app.use('/download', downloadRouter)

const musicDataManager = new MusicDataManager()

app.get('/homepage', async (req, res) => {
  const homepageData = await musicDataManager.getHomepageData()
  res.json(homepageData)
})

const port = process.env.PORT ?? 4000

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});