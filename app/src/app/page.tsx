"use client";

import { useEffect, useState } from "react";
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
    devAddresses : [ // Will insert these addresses in data groups as eligible addresse
	    "", 
    ]
  }
};
const zkConnect = ZkConnect(zkConnectConfig);

const THE_ETH_RICH_USERS = DataRequest({
  groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a", // TODO: change this id to our group id created by Tom when PR merged
});

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState<"already-inside" | "enter-auction" | null> (null);
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

      // If the proof is verified, a vaultId is returned. If not, an error is received.
      fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zkConnectResponse,
        }),
      }).then(res => {
        setVerifying(false);
        console.log(res);
        // setStatus(res.body.status);
      })
        .then((res) => {
          setVerifying(false);
          // SUCCESS REDIRECT TO AUCTION PAGE
        })
        .catch((err) => {
          console.log(err.response.data.status);
          setVerifying(false);
        });
    }
  }, []);

  return (
    <main>
      <div>
        <p>
          Get started by editing&nbsp;
          <code>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-purple-400 underline">
        Hello world!
      </h1>
      <div>
        <button onClick={onZkConnectButtonClick} disabled={verifying}>
          {verifying ? <span>verifying...</span> : <span>zkConnect</span>}
        </button>
      </div>

      <div>
        <a
          href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Templates <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Deploy <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
