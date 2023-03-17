"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
  groupId: "0x28e737a66c60878a0a2f45d440ffb042", // TODO: change this id to our group id created by Tom when PR merged
});



export default function Home() {
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState<
    "subscribed" | null
  >(null);

  function onZkConnectButtonClick() {
    // user gets redirected to get proof on data vault
    zkConnect.request({
      dataRequest: THE_ETH_RICH_USERS,
    });
  }

  useEffect(() => {
    const verifyLogin = async (zkConnectResponse: ZkConnectResponse) => {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zkConnectResponse,
        }),
      });
      setVerifying(false);
    
      if (res.status !== 200) return;
      const response = await res.json();
      setStatus(response.status);
    };
    
    const zkConnectResponse = zkConnect.getResponse();
    if (zkConnectResponse) {
      // when user gets redirected to our app
      setVerifying(true);
      verifyLogin(zkConnectResponse); // If the proof is verified, a vaultId is returned. If not, an error is received.
    }
  }, []);

  return (
    <main>
      <div>
        {!status && (
          <button onClick={onZkConnectButtonClick} disabled={verifying}>
            {verifying ? <span>verifying...</span> : <span>zkConnect</span>}
          </button>
        )}

        {/* {status && (
          <ul>
            {}
          </ul>
        )} */}
      </div>
    </main>
  );
}
