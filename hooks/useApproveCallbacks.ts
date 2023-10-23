// @ts-nocheck
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { useState } from "react";
import { ROUTER_ADDRESS, Token } from "./constants";
import { toWei } from "./helpers";

export function useApproveCallbacks(token: Token) {
  const [hash, setHash] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { address, connector, isConnected } = useAccount();

  const { data: allowance } = useContractRead({
    address: token.address,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address, ROUTER_ADDRESS],
    watch: true,
  });

  const params = [ROUTER_ADDRESS, toWei(999999999999)];
  const {
    writeAsync,
    data,
    isLoading: trxLoading,
    status,
  } = useContractWrite({
    address: token.address,
    abi: erc20ABI,
    functionName: "approve",
    args: [...params],
  });
  const approve = async () => {
    try {
      setLoading(true);

      const trx = await writeAsync();
      setHash(trx.hash);
    } catch (error) {
      console.log("approve trx error ", { error });
    } finally {
      setLoading(false);
    }
  };

  const { isError, isSuccess, isLoading } = useWaitForTransaction({
    hash: hash,
    confirmations: 1,
  });

  return {
    allowance: allowance?.toString(),
    approve: approve,
    trxHash: data?.hash,
    loading: isLoading || loading || trxLoading,
  };
}
