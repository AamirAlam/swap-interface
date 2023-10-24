import React, { useMemo, useState } from "react";
import Tokens from "./Tokens";
import Deposit from "./Deposit";
import Remove from "./Remove";
import { SWAP_TYPE } from "../../hooks/constants";
import { useApproveCallbacks } from "../../hooks/useApproveCallbacks";
import { fromWei, toWei } from "../../hooks/helpers";
import { usePools } from "../../hooks/usePools";
import Position from "../Position";
import BigNumber from "bignumber.js";
import { useLiquidityCallbacks } from "../../hooks/useLiquidityCallbacks";
import { useAccount } from "wagmi";
import Wallet from '../Wallet'

const availableTokens = [
  {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    decimals: 18,
    chainId: 5,
    icon: "ethereum.svg",
  },
  {
    id: 2,
    name: "USD coin",
    symbol: "USDC",
    chainId: 5,
    address: "0xBD4B78B3968922e8A53F1d845eB3a128Adc2aA12",
    decimals: 6,
    icon: "usdc.svg",
  },
  {
    id: 3,
    name: "Dai",
    symbol: "DAI",
    address: "0x30bDf1538e525f7f2c5b38F437E94DcE6b1E7bc5",
    decimals: 18,
    chainId: 5,
    icon: "dai.svg",
  },
];

export default function PoolForm(props) {
  const [token0, setToken0] = useState(availableTokens[0]);
  const [token1, setToken1] = useState(availableTokens[1]);
  const [token0Amount, setToken0Amount] = useState("");
  const [token1Amount, setToken1Amount] = useState("");
  const [showRemove, setShowRemove] = useState(false);
  const [lpAmount, setLpAmount] = useState("");

  const [swapType, setSwapType] = useState(SWAP_TYPE.FROM);

  const { isConnected } = useAccount();

  const resetTokenInputs = () => {
    setToken0Amount("");
    setToken1Amount("");
    setLpAmount("");
  };

  const handleToken0Change = (e) => {
    setToken0(availableTokens?.[parseInt(e.target.value.toString())]);
    resetTokenInputs();
  };

  const handleToken1Change = (e) => {
    setToken1(availableTokens?.[parseInt(e.target.value.toString())]);
    resetTokenInputs();
  };

  const handleAmount0Change = (e) => {
    setSwapType(SWAP_TYPE.FROM);
    setToken0Amount(e.target.value);
  };

  const handleAmount1Change = (e) => {
    setSwapType(SWAP_TYPE.TO);
    setToken1Amount(e.target.value);
  };

  const {
    allowance: token0Allowance,
    approve: token0Approve,
    loading: token0ApprovalLoading,
  } = useApproveCallbacks(token0);
  const {
    allowance: token1Allowance,
    approve: token1Approve,
    loading: token1ApprovalLoading,
  } = useApproveCallbacks(token1);

  const { lpBalance, pairAddress, pairDecimals, getToken0In, getToken1Out } =
    usePools(token0, token1);

  const {
    allowance: lpAllowance,
    approve: lpApprove,
    loading: lpAllowanceLoading,
  } = useApproveCallbacks({
    address: pairAddress,
    chainId: 5,
    decimals: pairDecimals,
    icon: "",
    id: 1,
    name: "",
    symbol: "",
  });

  const parsedAmount0 = useMemo(() => {
    if (pairAddress === "0x0000000000000000000000000000000000000000") {
      return token0Amount;
    }

    return swapType === SWAP_TYPE.FROM
      ? token0Amount
      : getToken0In(token1Amount);
  }, [swapType, token0Amount, pairAddress, token1Amount, getToken0In]);
  const parsedAmount1 = useMemo(() => {
    if (pairAddress === "0x0000000000000000000000000000000000000000") {
      return token1Amount;
    }

    return swapType === SWAP_TYPE.FROM
      ? getToken1Out(token0Amount)
      : token1Amount;
  }, [swapType, token1Amount, pairAddress, getToken1Out, token0Amount]);

  const { supplyLiquidity, withdrawLiquidity, loading, trxHash } =
    useLiquidityCallbacks();

  const buttonText = useMemo(() => {
    if (token0ApprovalLoading || token1ApprovalLoading) {
      return "Approving...";
    }

    if (loading) {
      return showRemove ? "Withdrawing..." : "Supplying...";
    }

    if(showRemove && lpAllowanceLoading){
      return 'Approving...'
    }

    if(showRemove && new BigNumber(lpAllowance).lt(toWei(lpAmount, pairDecimals))  ){
      return 'Approve LP'
    }



    if (
      token0.symbol !== "ETH" &&
      new BigNumber(token0Allowance).lt(toWei(parsedAmount0, token0.decimals))
    ) {
      return `Approve ${token0.symbol}`;
    }

    if (
      token1.symbol !== "ETH" &&
      new BigNumber(token1Allowance).lt(toWei(parsedAmount1, token1.decimals))
    ) {
      return `Approve ${token1.symbol}`;
    }

    if (showRemove) {
      return "Withdraw";
    }

    return "Supply liquidity";
  }, [
    token0Allowance,
    token1Allowance,
    token0ApprovalLoading,
    token1ApprovalLoading,
    parsedAmount0,
    parsedAmount1,
    token0,
    token1,
    loading,
    showRemove,
    lpAllowance,
    lpAmount,
    pairDecimals,
    lpAllowanceLoading
  ]);
  const handleAddLiquidity = async () => {
    if (
      token0.symbol !== "ETH" &&
      new BigNumber(token0Allowance).lt(toWei(parsedAmount0, token0.decimals))
    ) {
      token0Approve();
      return;
    }

    if (
      token1.symbol !== "ETH" &&
      new BigNumber(token1Allowance).lt(toWei(parsedAmount1, token1.decimals))
    ) {
      token1Approve();
      return;
    }

    supplyLiquidity(token0, token1, parsedAmount0, parsedAmount1);
  };

  const handleRemoveLiquidity = async () => {

    if(showRemove && new BigNumber(lpAllowance).lt(toWei(lpAmount, pairDecimals))  ){
      lpApprove()
      return
    }



    await withdrawLiquidity(token0, token1, lpAmount, pairDecimals);
  };

  const handleLpAmountChange = (e) => {
    setLpAmount(e.target.value);
  };

  const handleMax = (e) => {
    e.preventDefault();
    setLpAmount(fromWei(lpBalance, pairDecimals));
  };

  const handleRemoveLiquidityButton = (e) => {
    e.preventDefault();
    showRemove ? setShowRemove(false) : setShowRemove(true);
  };

  return (
    <form className="pool-form">
      <Tokens
        token0={token0}
        token1={token1}
        availableTokens={availableTokens}
        handleToken0Change={handleToken0Change}
        handleToken1Change={handleToken1Change}
      />

      {!showRemove && (
        <Deposit
          token0={token0}
          token1={token1}
          token0Amount={parsedAmount0}
          token1Amount={parsedAmount1}
          handleAmount0Change={handleAmount0Change}
          handleAmount1Change={handleAmount1Change}
        />
      )}
      {showRemove && (
        <Remove
          lpAmount={lpAmount}
          handleLpAmountChange={handleLpAmountChange}
          handleMax={handleMax}
        />
      )}

      <Position token0={token0} token1={token1} />

        {isConnected ?   <div className="actions">
        <button
          onClick={handleRemoveLiquidityButton}
          className="button calm-voice outline"
        >
          {showRemove ? "Back" : "Remove liquidity"}
        </button>
        <button
          type="button"
          disabled={loading || token0ApprovalLoading || token1ApprovalLoading}
          onClick={showRemove ? handleRemoveLiquidity : handleAddLiquidity}
          className="button calm-voice"
        >
          {buttonText}
        </button>
      </div> : <Wallet /> }
    </form>
  );
}
