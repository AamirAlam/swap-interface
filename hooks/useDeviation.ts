// @ts-nocheck
import { useContractReads } from "wagmi";

import { useMemo } from "react";
import {
  ROUTER_ADDRESS,
  SWAP_TYPE,
  Token,
  API3_PROXY_READER,
} from "./constants";
import ROUTER_ABI from "./abis/router.json";
import { fromWei } from "./helpers";
import BigNumber from "bignumber.js";
import API3_PROXY_ABI from "./abis/proxy.json";

export function useDeviation(
  token0: Token,
  token1: Token,
  token0Amount: string,
  token1Amount: string,
  path: string[],
  swapType: string
) {
  const tokenInput = useMemo(() => {
    return swapType === SWAP_TYPE.FROM ? token0Amount : token1Amount;
  }, [swapType, token0Amount, token1Amount]);

  // console.log("deviation test params ", { tokenInput, path });
  const { data: quoteData } = useContractReads({
    contracts: [
      {
        address: ROUTER_ADDRESS,
        abi: ROUTER_ABI,
        functionName: "getPriceDeviation",
        args: [tokenInput, path],
        chainId: 5,
      },
      {
        address: API3_PROXY_READER,
        abi: API3_PROXY_ABI,
        functionName: "readDataFeed",
        args: [token0.address],
        chainId: 5,
      },
      {
        address: API3_PROXY_READER,
        abi: API3_PROXY_ABI,
        functionName: "readDataFeed",
        args: [token1.address],
        chainId: 5,
      },
    ],
    watch: true,
  });

  const tradeQuote = useMemo(() => {
    if (
      quoteData?.[0]?.status === "failure" ||
      quoteData?.[1]?.status === "failure" ||
      !quoteData
    ) {
      return {
        oraclePrice: "",
        deviation: "",
        dexPrice: "",
      };
    }
    return {
      oraclePrice: [
        new BigNumber(quoteData?.[1]?.result?.[0]?.toString())
          .div(new BigNumber(quoteData?.[2]?.result?.[0]?.toString()))
          .toString(),
        new BigNumber(quoteData?.[2]?.result?.[0]?.toString())
          .div(new BigNumber(quoteData?.[1]?.result?.[0]?.toString()))
          .toString(),
      ],
      deviation: quoteData?.[0]?.result?.[0]?.toString(),
      dexPrice: new BigNumber(
        new BigNumber(quoteData?.[0]?.result?.[2]?.toString()).div(10 ** 8)
      )
        .div(fromWei(token0Amount, token0.decimals))
        .toString(),
    };
  }, [quoteData, token0Amount, token0]);

  return {
    tradeQuote: tradeQuote,
  };
}
