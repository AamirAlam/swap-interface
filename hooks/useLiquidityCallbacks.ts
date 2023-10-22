import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import ROUTER_ABI from "./abis/router.json";
import { useState } from "react";
import { ROUTER_ADDRESS, Token } from "./constants";
import { getUnixTime, toWei } from "./helpers";
import { parseEther } from "viem";

export function useLiquidityCallbacks() {
  const [hash, setHash] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { address } = useAccount();

  const { writeAsync: addLiquidity } = useContractWrite({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "addLiquidity",
    chainId: 5,
    onSuccess(data) {
      console.log("trade success ", data);
    },
  });

  const { writeAsync: addLiquidityETH } = useContractWrite({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "addLiquidityETH",
    chainId: 5,
    onSuccess(data) {
      console.log("trade success ", data);
    },
  });

  const { writeAsync: removeLiquidity } = useContractWrite({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "removeLiquidity",
    chainId: 5,
    onSuccess(data) {
      console.log("trade success ", data);
    },
  });

  const { writeAsync: removeLiquidityETH } = useContractWrite({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "removeLiquidityETH",
    chainId: 5,
    onSuccess(data) {
      console.log("trade success ", data);
    },
  });

  const supplyLiquidity = async (
    token0: Token,
    token1: Token,
    token0Amount: string,
    token1Amount: string
  ) => {
    try {
      if ([token0.symbol, token1.symbol].includes("ETH")) {
        // addLiquidtyETH
        const tokenAddress =
          token0.symbol === "ETH" ? token1.address : token0.address;
        const tokenAmount =
          token0.symbol === "ETH"
            ? toWei(token0Amount, token0.decimals)
            : toWei(token1Amount, token1.decimals);
        const ethAmount = token0.symbol === "ETH" ? token0Amount : token1Amount;

        const params = [
          tokenAddress,
          tokenAmount,
          0,
          0,
          address,
          getUnixTime(20),
        ];
        setLoading(true);
        const trxRes = await addLiquidityETH({
          args: [...params],
          value: parseEther(ethAmount),

          // overrides: { gasLimit: 3050000 },
        });

        setHash(trxRes.hash);
      } else {
        const params = [
          token0.address,
          token1.address,
          toWei(token0Amount, token0.decimals),
          toWei(token1Amount, token1.decimals),
          0,
          0,
          address,
          getUnixTime(20),
        ];
        setLoading(true);
        const trxRes = await addLiquidity({
          args: [...params],

          // overrides: { gasLimit: 3050000 },
        });

        setHash(trxRes.hash);
      }
    } catch (error) {
      console.log("swap trx error ", { error });
    } finally {
      setLoading(false);
    }
  };

  const withdrawLiquidity = async (
    token0: Token,
    token1: Token,
    lpAmount: string,
    decimals: number
  ) => {
    try {
      if ([token0.symbol, token1.symbol].includes("ETH")) {
        // addLiquidtyETH
        const tokenAddress =
          token0.symbol === "ETH" ? token1.address : token0.address;

        const params = [
          tokenAddress,
          toWei(lpAmount, decimals),
          0,
          0,
          address,
          getUnixTime(20),
        ];
        setLoading(true);
        const trxRes = await removeLiquidityETH({
          args: [...params],

          // overrides: { gasLimit: 3050000 },
        });

        setHash(trxRes.hash);
      } else {
        const params = [
          token0.address,
          token1.address,
          toWei(lpAmount, decimals),
          0,
          0,
          address,
          getUnixTime(20),
        ];
        setLoading(true);
        const trxRes = await removeLiquidity({
          args: [...params],

          // overrides: { gasLimit: 3050000 },
        });

        setHash(trxRes.hash);
      }
    } catch (error) {
      console.log("swap trx error ", { error });
    } finally {
      setLoading(false);
    }
  };

  const { isError, isSuccess, isLoading } = useWaitForTransaction({
    hash: hash,
    confirmations: 1,
  });

  return {
    withdrawLiquidity: withdrawLiquidity,
    supplyLiquidity: supplyLiquidity,
    trxHash: hash,
    loading: loading || isLoading,
  };
}
