import { Request, Response } from "express";
import Blocks from "../models/Blocks.js";
import Name from "../models/Name.js";

export const getAllBlocks = async (req: Request, res: Response) => {
  try {
    const blocks = await Blocks.find();
    const data = await Promise.all(
      blocks.map(async (block) => {
        const name = await Name.findOne({ match: block.owner?.toLowerCase() });
        return {
          blockId: block.blockId,
          owner: block.owner,
          uri: block.uri,
          name: name?.name ?? "",
        };
      })
    );
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const buyBlock = async (req: Request, res: Response) => {
  try {
    const {
      blocks,
    }: {
      blocks: { blockId: number; owner: string; uri: string }[];
    } = req.body;
    console.log(blocks);

    await Promise.all(
      blocks.map(async (item) => {
        const block = await Blocks.findOne({ blockId: item.blockId });
        if (!block) {
          const newBlock = new Blocks({
            blockId: item.blockId,
            owner: item.owner,
            uri: item.uri,
          });
          const saved = await newBlock.save();
        }
      })
    );
    return res.json("Success");
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const updateBlock = async (req: Request, res: Response) => {
  try {
    try {
      const {
        blockId,
        owner,
        uri,
      }: { blockId: number; owner: string; uri: string } = req.body;
      const block = await Blocks.findOne({ blockId });
      if (!block) {
        return res.status(400).json("Not sold yet");
      } else {
        block.owner = owner;
        block.uri = uri;
        const saved = await block.save();
        return res.json(saved);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
