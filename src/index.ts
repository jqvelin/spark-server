import "dotenv/config"
import express from "express";
import cors from "cors"
import { songsRouter } from "./models/Routers/songsRouter";
import { albumsRouter } from "./models/Routers/albumsRouter";
import { searchRouter } from "./models/Routers/searchRouter";
import { artistsRouter } from "./models/Routers/artistsRouter";

const app = express();
app.use(cors())

app.use('/artists', artistsRouter)
app.use('/songs', songsRouter)
app.use('/albums', albumsRouter)
app.use('/search', searchRouter)

const port = process.env.PORT ?? 4000

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});