import { ethers } from "ethers";
import { arbitrumNova } from "./network.js";
import { PixelMap } from "./config.js";
import { BigNumber } from "ethers/lib/ethers.js";
import Blocks from "../models/Blocks.js";
import Name from "../models/Name.js";
import { EthersMulticall } from "@morpho-labs/ethers-multicall";

const provider = new ethers.providers.JsonRpcProvider(arbitrumNova.rpcUrls[0]);
const ethersMulticall = new EthersMulticall(provider);

const contract = ethersMulticall.wrap(
  new ethers.Contract(PixelMap.address[42170], PixelMap.abi, provider)
);

contract.on(
  "Transfer",
  async (from: string, to: string, tokenId: BigNumber) => {
    console.log("Transfer--------", from, to, tokenId);
    try {
      const block = await Blocks.findOne({ blockId: tokenId.toNumber() });
      if (!block) {
        const uri = await contract.tokenURI(tokenId);
        const newBlock = new Blocks({
          blockId: tokenId.toNumber(),
          owner: to,
          uri,
        });
        await newBlock.save();
      } else {
        if (block.owner?.toLowerCase() !== to.toLowerCase()) {
          block.owner = to;
          await block.save();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
);

contract.on(
  "Update",
  async (owner: string, x: BigNumber, y: BigNumber, tokenURI: string) => {
    try {
      const blockId = x.toNumber() * 100 + y.toNumber();
      const block = await Blocks.findOne({ blockId });
      if (block) {
        block.uri = tokenURI;
        await block.save();
      }
    } catch (err) {
      console.log(err);
    }
  }
);

contract.on("Named", async (user: string, name: string) => {
  try {
    const data = await Name.findOne({ match: user.toLowerCase() });
    if (data && data?.name !== name) {
      data.name = name;
      await data.save();
    }
  } catch (err) {
    console.log(err);
  }
});

// const fetchBlocks = async () => {
//   await Promise.all(
//     Array(5000)
//       .fill(0)
//       .map(async (_, index) => {
//         const block = await Blocks.findOne({ blockId: index + 5000 });
//         if (!block) {
//           try {
//             const data = await contract.getBlockInfo(
//               ~~((index + 5000) / 100),
//               (index + 5000) % 100
//             );
//             const newBlock = new Blocks({
//               blockId: index + 5000,
//               owner: data.owner,
//               uri: data.uri,
//             });
//             await newBlock.save();
//           } catch (err) {
//             console.log("---------", index + 5000, err);
//             const owner = await contract.ownerOf(index + 5000);

//             const newBlock = new Blocks({
//               blockId: index + 5000,
//               owner: owner,
//               uri: "",
//             });
//             await newBlock.save();
//           }
//         }
//       })
//   );
//   console.log("done123456");
// };
