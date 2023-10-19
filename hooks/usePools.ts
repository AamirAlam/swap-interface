// @ts-nocheck
import { useAccount, useContractRead, useContractReads } from "wagmi";

import { useMemo } from "react";
import { FACTORY_ADDRESS, Token } from "./constants";
import PAIR_ABI from "./abis/pair.json";
import FACTORY_ABI from "./abis/factory.json";
import BigNumber from "bignumber.js";

export function usePools(token0: Token, token1: Token) {
  const { address, connector, isConnected } = useAccount();

  const { data: pairAddress, isLoading } = useContractRead({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: "getPair",
    args: [token0.address, token1.address],
    chainId: 5,
    watch: true,
  });

  const pairContract = {
    address: pairAddress,
    abi: PAIR_ABI,
  };
  // user lp positions
  const { data, isLoading: lpLoading } = useContractReads({
    contracts: [
      {
        ...pairContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...pairContract,
        functionName: "getReserves",
        args: [],
      },
      {
        ...pairContract,
        functionName: "totalSupply",
        args: [],
      },
      {
        ...pairContract,
        functionName: "token0",
        args: [],
      },
      {
        ...pairContract,
        functionName: "token1",
        args: [],
      },
    ],
  });

  const token0Balance = useMemo(() => {
    const lpBalance = data?.[0]?.result?.toString();
    const reserve0 = data?.[1]?.result?.[0]?.toString();
    const totalSupply = data?.[2]?.result?.toString();
    const bal = new BigNumber(reserve0)
      .multipliedBy(lpBalance)
      .div(totalSupply)
      .toFixed(0);

    return bal;
  }, [data]);

  const token1Balance = useMemo(() => {
    const lpBalance = data?.[0]?.result?.toString();
    const reserve1 = data?.[1]?.result?.[1]?.toString();
    const totalSupply = data?.[2]?.result?.toString();
    const bal = new BigNumber(reserve1)
      .multipliedBy(lpBalance)
      .div(totalSupply)
      .toFixed(0);

    return bal;
  }, [data]);

  const balances = useMemo(() => {
    const balMap = {};
    balMap[`${data?.[3]?.result?.toString()?.toLowerCase()}`] = token0Balance;
    balMap[`${data?.[4]?.result?.toString()?.toLowerCase()}`] = token1Balance;
    return balMap;
  }, [data, token0Balance, token1Balance]);

  console.log("pair address ", {
    pairAddress,
    data,
    lpBalance: data?.[0]?.result?.toString(),
    balances,
    reserves: data?.[1]?.result?.[0]?.toString(),
  });

  return {
    lpBalance: data?.[0]?.result?.toString(),
    pairAddress: pairAddress,
    balances,
  };
}
