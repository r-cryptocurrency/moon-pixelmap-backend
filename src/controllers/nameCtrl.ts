import { Request, Response } from "express";
import Name from "../models/Name.js";

export const getName = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const name = await Name.findOne({ match: address.toLowerCase() });
    return res.json(name?.name ?? "");
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const setName = async (req: Request, res: Response) => {
  try {
    const { address, name }: { address: string; name: string } = req.body;
    const update = await Name.findOneAndUpdate(
      { match: address.toLowerCase() },
      { address, name, match: address.toLowerCase() },
      { new: true, upsert: true }
    );
    return res.json(update);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
