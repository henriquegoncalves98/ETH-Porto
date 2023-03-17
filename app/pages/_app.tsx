import { AppProps } from "next/app";
import "../styles/global.css";
import RootLayout from "./layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
