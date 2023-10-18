// @ts-nocheck
import {
  erc20ABI,
  useAccount,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { useState } from "react";
import { ROUTER_ADDRESS, SWAP_TYPE, Token } from "./constants";
import { toWei } from "./helpers";

export function useApproveCallbacks(token: Token) {
  const [hash, setHash] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { address, connector, isConnected } = useAccount();

  const params = [ROUTER_ADDRESS, toWei(999999999999)];
  const { writeAsync, data, isLoading, status } = useContractWrite({
    address: token.address,
    abi: erc20ABI,
    functionName: "approve",
    args: [...params],
  });
  const approve = async () => {
    try {
      setLoading(true);

      await writeAsync();
    } catch (error) {
      console.log("approve trx error ", { error });
    } finally {
      setLoading(false);
    }
  };

  // const { isError, isSuccess, isLoading } = useWaitForTransaction({
  //   hash: hash,
  // });

  return {
    approve: approve,
    trxHash: data?.hash,
    loading: isLoading || loading,
  };
}
