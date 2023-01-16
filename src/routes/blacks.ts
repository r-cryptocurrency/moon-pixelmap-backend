import express from "express";
import db from "../models/blacks.js";

const router = express.Router();
const Blacks = db();

router.get("/all", (req, res) => {
  Blacks.read()
    .then(() => {
      const blocks = Blacks.data?.blocks ?? [203];
      return res.json(blocks);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

router.post("/add", (req, res) => {
  const { blocks }: { blocks: { x: number; y: number }[] } = req.body;

  Blacks.read()
    .then(() => {
      const data = Blacks.data?.blocks || [];
      blocks.map((item) => {
        const blockId = item.x * 100 + item.y;
        const index = data.findIndex((block) => block === blockId);
        if (index === -1) {
          data.push(blockId);
        }
      });
      data.sort();

      Blacks.data = { ...Blacks.data, blocks: data };
      Blacks.write()
        .then(() => {
          return res.json(data);
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

router.post("/remove", (req, res) => {
  const { blocks }: { blocks: { x: number; y: number }[] } = req.body;

  Blacks.read()
    .then(() => {
      const data = Blacks.data?.blocks || [];
      blocks.map((item) => {
        const blockId = item.x * 100 + item.y;
        const index = data.findIndex((block) => block === blockId);
        if (index > -1) {
          data.splice(index, 1);
        }
      });

      Blacks.data = { ...Blacks.data, blocks: data };
      Blacks.write()
        .then(() => {
          return res.json(data);
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

export default router;
