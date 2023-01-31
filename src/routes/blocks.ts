import express from "express";
import * as blocksCtrl from "../controllers/blocksCtrl.js";

const router = express.Router();

router.get("/all", (req, res) => blocksCtrl.getAllBlocks(req, res));

router.post("/buy", (req, res) => blocksCtrl.buyBlock(req, res));

router.post("/update", (req, res) => blocksCtrl.updateBlock(req, res));

export default router;
