// @ts-nocheck
import { useContractReads } from "wagmi";

import { useMemo } from "react";
import { API3_PROXY_READER, Token } from "./constants";
import API3_PROXY_ABI from "./abis/proxy.json";
import { fromWei } from "./helpers";
import BigNumber from "bignumber.js";

export function useUSDValues(
  token0: Token,
  token1: Token,
  token0Amount: string,
  token1Amount: string
) {
  const { data: priceData } = useContractReads({
    contracts: [
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

  const token0USDValue = useMemo(() => {
    if (!priceData || !token0Amount) {
      return "0";
    }

    return new BigNumber(fromWei(priceData?.[0]?.result?.[0]))
      .multipliedBy(token0Amount)
      .toString();
  }, [priceData, token0Amount]);

  const token1USDValue = useMemo(() => {
    if (!priceData || !token1Amount) {
      return "0";
    }

    return new BigNumber(fromWei(priceData?.[1]?.result?.[0]))
      .multipliedBy(token1Amount)
      .toString();
  }, [priceData, token1Amount]);

  return {
    token0USD: token0USDValue,
    token1USD: token1USDValue,
  };
}
