import "@rainbow-me/rainbowkit/styles.css";
import "../styles/site.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Layout from "../components/Layout";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    goerli,

    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Uniswap fork",
  projectId: "54ee227eb9eafd4f0c36343b5cbae98d",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
		<Layout>
      <Component {...pageProps} />
    </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
