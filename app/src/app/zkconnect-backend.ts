import { ZkConnect, ZkConnectServerConfig } from "@sismo-core/zk-connect-server";

const zkConnectConfig: ZkConnectServerConfig = {
  appId: "0x52913711b4d9d877a522b06170b5648f", // appId you registered
}
export const zkConnectBackend = ZkConnect(zkConnectConfig);