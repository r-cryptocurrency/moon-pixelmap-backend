import express from "express";
import * as nameCtrl from "../controllers/nameCtrl.js";

const router = express.Router();

router.get("/get/:address", (req, res) => nameCtrl.getName(req, res));

router.post("/set", (req, res) => nameCtrl.setName(req, res));

export default router;
