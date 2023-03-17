import type { NextApiRequest, NextApiResponse } from "next";
import {
  ZkConnect,
  ZkConnectServerConfig,
  DataRequest,
} from "@sismo-core/zk-connect-server";

// const zkConnectConfig: ZkConnectServerConfig = {
//   appId: "0x52913711b4d9d877a522b06170b5648f", // appId you registered
//   devMode: {
//     enabled: true,
//   }
// }
// export const zkConnect = ZkConnect(zkConnectConfig);

// const THE_ETH_RICH_USERS = DataRequest({
//   groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a", // TODO: change this id to our group id created by Tom when PR merged
// });

const vaultIdStore: string[] = [];

export async function POST(request: Request) {
  const { body, method } = request;
  const { zkConnectResponse } = body;

  switch (method) {
    case "POST":
      try {
        debugger;
        // const { vaultId } = await zkConnect.verify(zkConnectResponse, {
        //   dataRequest: THE_ETH_RICH_USERS,
        // });
        // console.log("vaultId", vaultId);
        // if (vaultIdStore.includes(vaultId)) {
        //   res.status(200).send({ status: "already-inside", vaultId });
        //   return;
        // }
        // vaultIdStore.push(vaultId);
        // res.status(201).send({ status: "enter-auction", vaultId });
      } catch (e: any) {
        res.status(400).send({ status: "error", message: e.message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed --`);
  }
}
