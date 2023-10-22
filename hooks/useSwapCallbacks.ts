import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import ROUTER_ABI from "./abis/router.json";
import { useState } from "react";
import { ROUTER_ADDRESS, SWAP_TYPE, Token } from "./constants";
import { getUnixTime, toWei } from "./helpers";
import { parseEther } from "viem";

export function useSwapCallbacks() {
  const [hash, setHash] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { address } = useAccount();

  const { writeAsync: swapExactTokensForETH } = useContractWrite({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "swapExactTokensForETH",
    chainId: 5,
    onSuccess(data) {
      console.log("trade success ", data);
    },
  });

  const { writeAsync: swapTokensForExactETH } = useContractWrite({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "swapTokensForExactETH",
    chainId: 5,
    onSuccess(data) {
      console.log("trade success ", data);
    },
  });

  const { writeAsync: swapExactETHForTokens } = useContractWrite({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "swapExactETHForTokens",
    chainId: 5,
    onSuccess(data) {
      console.log("trade success ", data);
    },
  });

  const { writeAsync: swapETHForExactTokens } = useContractWrite({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "swapETHForExactTokens",
    chainId: 5,
    onSuccess(data) {
      console.log("trade success ", data);
    },
  });

  const { writeAsync: swapExactTokensForTokens } = useContractWrite({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "swapExactTokensForTokens",
    chainId: 5,
    onSuccess(data) {
      console.log("trade success ", data);
    },
  });

  const { writeAsync: swapTokensForExactTokens } = useContractWrite({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "swapTokensForExactTokens",
    chainId: 5,
    onSuccess(data) {
      console.log("trade success ", data);
    },
  });

  const swapTokens = async (
    token0: Token,
    token1: Token,
    swapType: string,
    token0Amount: string,
    token1Amount: string
  ) => {
    try {
      if (
        token0.symbol !== "ETH" &&
        token1.symbol === "ETH" &&
        swapType === SWAP_TYPE.FROM
      ) {
        const params = [
          toWei(token0Amount, token0.decimals),
          0,
          [token0.address, token1.address],
          address,
          getUnixTime(20),
        ];
        setLoading(true);
        const trxRes = await swapExactTokensForETH({
          args: [...params],

          // overrides: { gasLimit: 3050000 },
        });

        setHash(trxRes.hash);
      }
      if (
        token0.symbol !== "ETH" &&
        token1.symbol === "ETH" &&
        swapType === SWAP_TYPE.TO
      ) {
        const params = [
          toWei(token1Amount, token1.decimals),
          0,
          [token0.address, token1.address],
          address,
          getUnixTime(20),
        ];
        setLoading(true);
        const trxRes = await swapTokensForExactETH({
          args: [...params],

          // overrides: { gasLimit: 3050000 },
        });

        setHash(trxRes.hash);
      } else if (
        token0.symbol === "ETH" &&
        token1.symbol !== "ETH" &&
        swapType === SWAP_TYPE.FROM
      ) {
        const params = [
          0,
          [token0.address, token1.address],
          address,
          getUnixTime(20),
        ];
        setLoading(true);
        const trxRes = await swapExactETHForTokens({
          args: [...params],
          value: parseEther(token0Amount),

          // overrides: { gasLimit: 3050000 },
        });

        setHash(trxRes.hash);
      } else if (
        token0.symbol === "ETH" &&
        token1.symbol !== "ETH" &&
        swapType === SWAP_TYPE.TO
      ) {
        const params = [
          0,
          [token0.address, token1.address],
          address,
          getUnixTime(20),
        ];
        setLoading(true);
        const trxRes = await swapETHForExactTokens({
          args: [...params],
          value: parseEther(token0Amount),

          // overrides: { gasLimit: 3050000 },
        });

        setHash(trxRes.hash);
      } else if (
        token0.symbol !== "ETH" &&
        token1.symbol !== "ETH" &&
        swapType === SWAP_TYPE.FROM
      ) {
        const params = [
          toWei(token0Amount, token0.decimals),
          0,
          [token0.address, token1.address],
          address,
          getUnixTime(20),
        ];
        setLoading(true);
        const trxRes = await swapExactTokensForTokens({
          args: [...params],
        });

        setHash(trxRes.hash);
      } else if (
        token0.symbol !== "ETH" &&
        token1.symbol !== "ETH" &&
        swapType === SWAP_TYPE.TO
      ) {
        const params = [
          toWei(token1Amount, token1.decimals),
          0,
          [token0.address, token1.address],
          address,
          getUnixTime(20),
        ];
        setLoading(true);
        const trxRes = await swapTokensForExactTokens({
          args: [...params],
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
    swapTokens: swapTokens,
    trxHash: hash,
    loading: loading || isLoading,
  };
}
