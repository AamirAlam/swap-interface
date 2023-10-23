// @ts-nocheck
import { useContractReads } from "wagmi";

import { useMemo } from "react";
import { ROUTER_ADDRESS, SWAP_TYPE, Token } from "./constants";
import ROUTER_ABI from "./abis/router.json";
import { fromWei } from "./helpers";
import BigNumber from "bignumber.js";

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
    ],
    watch: true,
  });

  // console.log("quote info ", {
  //   quoteData,
  //   token0Amount,
  //   token1Amount,
  //   token0,
  //   token1,
  // });
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
        .div(fromWei(token0Amount, token0.decimals))
        .toFixed(4),
    };
  }, [quoteData, token0Amount, token0]);

  return {
    tradeQuote: tradeQuote,
  };
}
