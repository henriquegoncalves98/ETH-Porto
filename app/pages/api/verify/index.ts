import type { NextApiRequest, NextApiResponse } from "next";
import {
  ZkConnect,
  ZkConnectServerConfig,
  DataRequest,
} from "@sismo-core/zk-connect-server";
import { THE_ETH32_RICH_USERS } from '../../../shared/groups';

const zkConnectConfig: ZkConnectServerConfig = {
  appId: "0x52913711b4d9d877a522b06170b5648f", // appId you registered
  devMode: {
    enabled: true,
  },
};
export const zkConnect = ZkConnect(zkConnectConfig);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405);
  const { body } = req;

  const { zkConnectResponse } = body;
  try {
    const { vaultId } = await zkConnect.verify(zkConnectResponse, {
      dataRequest: DataRequest(THE_ETH32_RICH_USERS),
    });
    console.log("vaultId", vaultId);
    return res.json({ status: "subscribed", vaultId });
  } catch (err: any) {
    return res.status(400).send({ status: null, message: err.message });
  }
}
