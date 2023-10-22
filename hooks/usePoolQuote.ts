// @ts-nocheck
import { useContractReads } from "wagmi";

import { useMemo } from "react";
import { ROUTER_ADDRESS, SWAP_TYPE, Token } from "./constants";
import ROUTER_ABI from "./abis/router.json";
import { toWei } from "./helpers";

export function usePoolQuote(
  token0: Token,
  token1: Token,
  token0Amount: string,
  token1Amount: string,
  swapType: string
) {
  const tokenInput = useMemo(() => {
    return swapType === SWAP_TYPE.FROM
      ? toWei(token0Amount, token0.decimals)
      : toWei(token1Amount, token1.decimals);
  }, [swapType, token0Amount, token1Amount, token0, token1]);

  const { data: quoteData } = useContractReads({
    contracts: [
      {
        address: ROUTER_ADDRESS,
        abi: ROUTER_ABI,
        functionName:
          swapType === SWAP_TYPE.FROM ? "getAmountsOut" : "getAmountsIn",
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
        token0Quote: "",
        token1Quote: "",
      };
    }
    return {
      token0Quote: quoteData?.[0]?.result?.[0]?.toString(),
      token1Quote: quoteData?.[0]?.result?.[1]?.toString(),
    };
  }, [quoteData]);

  return {
    tradeQuote: tradeQuote,
  };
}
