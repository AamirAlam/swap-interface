// @ts-nocheck
import { useAccount, useContractRead, useContractReads } from "wagmi";

import { useMemo } from "react";
import { ROUTER_ADDRESS, SWAP_TYPE, Token, TradeQuote } from "./constants";
import { erc20ABI } from "wagmi";
import ROUTER_ABI from "./abis/router.json";
import { fromWei, toWei } from "./helpers";
import BigNumber from "bignumber.js";

export function useContractCalls(
  token0: Token,
  token1: Token,
  token0Amount: string,
  token1Amount: string,
  path: string[],
  swapType: string
) {
  const { address, connector, isConnected } = useAccount();

  const { data, isLoading } = useContractRead({
    address: token0.address,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address, ROUTER_ADDRESS],
    watch: true,
  });

  const routerContract = {
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
  };

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
  const tradeQuote: TradeQuote = useMemo(() => {
    if (
      quoteData?.[0]?.status === "failure" ||
      quoteData?.[1]?.status === "failure"
    ) {
      return {
        token0Amount: "",
        token1Amount: "",
        oraclePrice: "",
        deviation: "",
        dexPrice: "",
      };
    }
    return {
      token0Amount: quoteData?.[0]?.result?.[0]?.toString(),
      token1Amount: quoteData?.[0]?.result?.[1]?.toString(),
      oraclePrice: new BigNumber(quoteData?.[1]?.result?.[1]?.toString())
        .div(10 ** 8)
        ?.toFixed(4),
      deviation: quoteData?.[1]?.result?.[0]?.toString(),
      dexPrice: new BigNumber(
        new BigNumber(quoteData?.[1]?.result?.[2]?.toString()).div(10 ** 8)
      )
        .div(token0Amount)
        .toFixed(4),
    };
  }, [quoteData, token0Amount]);

  return {
    allowance: data?.toString(),
    tradeQuote: tradeQuote,
  };
}
