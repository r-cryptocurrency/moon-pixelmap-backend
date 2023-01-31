import { Request, Response } from "express";
import Blacks from "../models/Blacks.js";

export const getAllBlacks = async (req: Request, res: Response) => {
  try {
    const blacks = await Blacks.find();
    console.log(blacks);
    return res.json(blacks.map((black) => black.blockId) ?? []);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const addBlack = async (req: Request, res: Response) => {
  try {
    const { blacks }: { blacks: number[] } = req.body;
    await Promise.all(
      blacks.map(async (black) => {
        console.log(black);
        await Blacks.findOneAndUpdate(
          { blockId: black },
          { blockId: black },
          { new: true, upsert: true }
        );
      })
    );
    return res.json("Success");
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const removeBlack = async (req: Request, res: Response) => {
  try {
    const { blacks }: { blacks: number[] } = req.body;
    await Promise.all(
      blacks.map(async (black) => {
        await Blacks.findOneAndRemove({ blockId: black });
      })
    );
    return res.json("Success");
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
