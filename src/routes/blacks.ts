import express from "express";
import * as blacksCtrl from '../controllers/blacksCtrl.js'

const router = express.Router();

router.get("/all", (req, res) => blacksCtrl.getAllBlacks(req, res));

router.post("/add", (req, res) => blacksCtrl.addBlack(req, res));

router.post("/remove", (req, res) => blacksCtrl.removeBlack(req, res));

export default router;
