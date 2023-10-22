// @ts-nocheck
import { useAccount, useContractRead, useContractReads } from "wagmi";

import { useMemo } from "react";
import { ROUTER_ADDRESS, SWAP_TYPE, Token, TradeQuote } from "./constants";
import { erc20ABI } from "wagmi";
import ROUTER_ABI from "./abis/router.json";
import { fromWei, toWei } from "./helpers";
import BigNumber from "bignumber.js";

export function useDeviation(
  token0: Token,
  token1: Token,
  token0Amount: string,
  token1Amount: string,
  path: string[],
  swapType: string
) {
  const { address, connector, isConnected } = useAccount();

  const tokenInput = useMemo(() => {
    return swapType === SWAP_TYPE.FROM
      ? toWei(token0Amount, token0.decimals)
      : toWei(token1Amount, token1.decimals);
  }, [swapType, token0Amount, token1Amount, token0, token1]);
  const { data: quoteData } = useContractReads({
    contracts: [
      // {
      //   address: ROUTER_ADDRESS,
      //   abi: ROUTER_ABI,
      //   functionName:
      //     swapType === SWAP_TYPE.FROM ? "getAmountsOut" : "getAmountsIn",
      //   args: [tokenInput, path],
      //   chainId: 5,
      // },
      {
        address: ROUTER_ADDRESS,
        abi: ROUTER_ABI,
        functionName: "getPriceDeviation",
        args: [tokenInput, path],
        chainId: 5,
      },
    ],
    watch: true,
  });

  console.log("quote info ", {
    quoteData,
    token0Amount,
    token1Amount,
    token0,
    token1,
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
      oraclePrice: new BigNumber(quoteData?.[0]?.result?.[1]?.toString())
        .div(10 ** 8)
        ?.toFixed(4),
      deviation: quoteData?.[0]?.result?.[0]?.toString(),
      dexPrice: new BigNumber(
        new BigNumber(quoteData?.[0]?.result?.[2]?.toString()).div(10 ** 8)
      )
        .div(token0Amount)
        .toFixed(4),
    };
  }, [quoteData, token0Amount]);

  return {
    tradeQuote: tradeQuote,
  };
}
