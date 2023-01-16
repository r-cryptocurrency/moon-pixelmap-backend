import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const Blacks = () => {
  type Data = {
    blocks: number[];
  };

  const adapter = new JSONFile<Data>("db.json");
  const db = new Low(adapter);

  return db;
};

export default Blacks;
