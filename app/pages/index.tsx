"use client";

import {QRCodeSVG} from 'qrcode.react';

import { useEffect, useState } from "react";
import {
  THE_ETH128_RICH_USERS,
  THE_ETH32_RICH_USERS,
  THE_ETH64_RICH_USERS,
} from "../shared/groups";

import {
  ZkConnect,
  ZkConnectClientConfig,
  ZkConnectResponse,
  DataRequest,
} from "@sismo-core/zk-connect-client";

const zkConnectConfig: ZkConnectClientConfig = {
  appId: "0x52913711b4d9d877a522b06170b5648f",
  devMode: {
    enabled: true,
    devAddresses: [
      "0xE4092E8EF085faabb384852e074A84Dcf1EceF29",
      "0x3740Ea52f5bBadde4c6aDe7aC324447611a2f1a7"
    ],
  },
};

const eligibleGroups: { groupId: string; title: string }[] = [
  { ...THE_ETH32_RICH_USERS, title: "Rich" },
  { ...THE_ETH64_RICH_USERS, title: "Richer" },
  { ...THE_ETH128_RICH_USERS, title: "Very Rich" },
];

const zkConnect = ZkConnect(zkConnectConfig);

const vaultsConnected: string[] = [];
let proof: string | null = null;

export default function Home() {
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState<"subscribed" | null>(null);

  function onZkConnectButtonClick() {
    // user gets redirected to get proof on data vault
    zkConnect.request({
      dataRequest: DataRequest(THE_ETH32_RICH_USERS),
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
      vaultsConnected.push(response.vaultId);
      proof = response.toString();
    };

    const zkConnectResponse = zkConnect.getResponse();
    if (zkConnectResponse) {
      // when user gets redirected to our app
      setVerifying(true);
      verifyLogin(zkConnectResponse); // If the proof is verified, a vaultId is returned. If not, an error is received.
    }
  }, []);

  const buttonText = () => {
    if (verifying) return "Verifying";
    if (!vaultsConnected || vaultsConnected.length == 0) return "Get Ticket";
    if (vaultsConnected && vaultsConnected.length > 0) {
      return ``;
    }
  };
  return (
    <main className="flex flex-col justify-center h-screen">
      <div className="mx-auto flex justify-center text-4xl text-black">
        Private Event - Minimum entry 32 ETH
      </div>
      <div className="flex justify-center p-5">
        {(status == 'subscribed' || verifying) ? (
          <span className="text-black">{buttonText()}</span>
        ) : (
          <button
            className="btn rounded-lg w-64 overflow-ellipsis"
            onClick={onZkConnectButtonClick}
            disabled={status == 'subscribed' || verifying}
          >
            {buttonText()}
          </button>
        )}
      </div>
      <div className="flex justify-center p-5">
        {proof && <QRCodeSVG value={proof} />}
      </div>
    </main>
  );
}
