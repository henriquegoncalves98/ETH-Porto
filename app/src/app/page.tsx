"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

import {
  DataRequest,
  ZkConnect,
  ZkConnectClientConfig,
  ZkConnectResponse,
} from "@sismo-core/zk-connect-client";

const zkConnectConfig: ZkConnectClientConfig = {
  appId: "0x52913711b4d9d877a522b06170b5648f",
  devMode: {
    enabled: true, // will use the Dev Sismo Data Vault https://dev.vault-beta.sismo.io/
    devAddresses: [
      // Will insert these addresses in data groups as eligible addresse
      "0xE4092E8EF085faabb384852e074A84Dcf1EceF29",
    ],
  },
};
const zkConnect = ZkConnect(zkConnectConfig);

const THE_ETH_RICH_USERS = DataRequest({
  groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a", // TODO: change this id to our group id created by Tom when PR merged
});

const inter = Inter({ subsets: ["latin"] });

const verifyLogin = async (zkConnectResponse: ZkConnectResponse) => {
  debugger;
  const response = await fetch("/api/hello", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({
    //   zkConnectResponse,
    // }),
  });
  // .then((res) => {
  //   setVerifying(false);
  //   console.log(res);
  //   // setStatus(res.body.status);
  // })
  // .then((res) => {
  //   setVerifying(false);
  //   // SUCCESS REDIRECT TO AUCTION PAGE
  // })
  // .catch((err) => {
  //   console.log(err.response.data.status);
  //   setVerifying(false);
  // });
};

export default function Home() {
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState<
    "already-inside" | "enter-auction" | null
  >(null);
  const [zkConnectResponse, setZkConnectResponse] =
    useState<ZkConnectResponse | null>(null);

  function onZkConnectButtonClick() {
    // user gets redirected to get proof on data vault
    zkConnect.request({
      dataRequest: THE_ETH_RICH_USERS,
    });
  }

  useEffect(() => {
    const zkConnectResponse = zkConnect.getResponse();
    if (zkConnectResponse) {
      // when user gets redirected to our app
      setZkConnectResponse(zkConnectResponse);
      setVerifying(true);
      debugger;
      verifyLogin(zkConnectResponse);
      // If the proof is verified, a vaultId is returned. If not, an error is received.
    }
  }, []);

  return (
    <main>
      <div>
        <button onClick={onZkConnectButtonClick} disabled={verifying}>
          {verifying ? <span>verifying...</span> : <span>zkConnect</span>}
        </button>
      </div>
    </main>
  );
}
