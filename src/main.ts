import express from "express";
import cors from "cors"
import { songsRouter } from "./models/Routers/songsRouter";
import { albumsRouter } from "./models/Routers/albumsRouter";
import { searchRouter } from "./models/Routers/searchRouter";

const app = express();
app.use(cors())

app.use('/songs', songsRouter)
app.use('/albums', albumsRouter)
app.use('/search', searchRouter)

app.listen(3000, () => {
  console.log('Running on port 3000');
});