import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import blackRouter from "./routes/blacks.js";
import blockRouter from "./routes/blocks.js";
import nameRouter from "./routes/name.js";

import "./contracts/listener.js";

dotenv.config();

const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = express();
const port = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/blackout", blackRouter);
app.use("/api/blocks", blockRouter);
app.use("/api/name", nameRouter);

app.listen(port, () => console.log(`Server is running at PORT ${port}`));
