import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import blackRouter from "./routes/blacks.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/blackout", blackRouter);

app.listen(port, () => console.log(`Server is running at PORT ${port}`));
