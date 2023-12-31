import React, { useMemo, useState } from "react";
import FromFieldset from "./FromFieldset";
import ToFieldset from "./ToFieldset";
import InfoBox from "./InfoBox";
import { SWAP_TYPE } from "../../hooks/constants";
import { useSwapCallbacks } from "../../hooks/useSwapCallbacks";
import { fromWei, toWei } from "../../hooks/helpers";
import BigNumber from "bignumber.js";
import { useApproveCallbacks } from "../../hooks/useApproveCallbacks";
import { usePools } from "../../hooks/usePools";
import { useDeviation } from "../../hooks/useDeviation";
import { useSwapQuote } from "../../hooks/useSwapQuote";
import gsap from "gsap";
import { useUSDValues } from "../../hooks/useUSDValues";
import { useAccount } from "wagmi";
import Wallet from "../Wallet";

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

const Swap = () => {
  const [tokenFrom, setTokenFrom] = useState(availableTokens[0]);
  const [tokenTo, setTokenTo] = useState(availableTokens[1]);
  const [amountToSwap, setAmountToSwap] = useState("");
  const [amountToReceive, setAmountToReceive] = useState("");
  const [swapType, setSwapType] = useState(SWAP_TYPE.FROM);
  const [isSwitched, setIsSwitched] = useState(false);

  const { isConnected } = useAccount();

  const path = useMemo(() => {
    return [tokenFrom.address, tokenTo.address];
  }, [tokenFrom, tokenTo]);

  const {
    tradeQuote: { token0Quote, token1Quote },
  } = useSwapQuote(
    tokenFrom,
    tokenTo,
    amountToSwap,
    amountToReceive,
    path,
    swapType
  );

  const {
    tradeQuote: { deviation, dexPrice, oraclePrice },
  } = useDeviation(
    tokenFrom,
    tokenTo,
    token0Quote,
    token1Quote,
    path,
    swapType
  );

  const {} = usePools(tokenFrom, tokenTo);

  const { swapTokens, loading, trxHash } = useSwapCallbacks();
  const {
    allowance,
    approve,
    loading: approveLoading,
    trxHash: approveHash,
  } = useApproveCallbacks(tokenFrom);

  const handleTokenFromChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTokenFrom(availableTokens?.[parseInt(event.target.value.toString())]);
  };

  const handleTokenToChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTokenTo(availableTokens?.[parseInt(event.target.value.toString())]);
  };

  const handleAmountFromChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSwapType(SWAP_TYPE.FROM);
    setAmountToSwap(event.target.value);
  };

  const handleAmountToChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSwapType(SWAP_TYPE.TO);
    setAmountToReceive(event.target.value);
  };

  const handleSwitch = (event: React.MouseEvent<HTMLButtonElement>) => {
    const _tokenFrom = tokenFrom;
    const amount0 = parsedAmount0;

    gsap.to(event.target, {
      duration: 0.5,
      rotation: isSwitched ? 0 : 180,
      ease: "elastic.inOut(1, 0.8)",
    });

    setIsSwitched(!isSwitched);
    setTokenFrom(tokenTo);
    setAmountToSwap(parsedAmount1);

    setTokenTo(_tokenFrom);

    setAmountToReceive(amount0);
  };

  const parsedAmount0 = useMemo(
    () =>
      swapType === SWAP_TYPE.FROM
        ? amountToSwap
        : fromWei(token0Quote, tokenFrom.decimals),
    [swapType, amountToSwap, token0Quote, tokenFrom]
  );
  const parsedAmount1 = useMemo(
    () =>
      swapType === SWAP_TYPE.FROM
        ? fromWei(token1Quote, tokenTo.decimals)
        : amountToReceive,
    [swapType, token1Quote, amountToReceive, tokenTo]
  );

  const { token0USD, token1USD } = useUSDValues(
    tokenFrom,
    tokenTo,
    parsedAmount0,
    parsedAmount1
  );

  const handleSwap = async () => {
    await swapTokens(
      tokenFrom,
      tokenTo,
      swapType,
      parsedAmount0,
      parsedAmount1
    );
  };

  const handleApprove = async () => {
    await approve();
  };

  return (
    <form className="swap-form">
      <FromFieldset
        handleTokenChange={handleTokenFromChange}
        handleAmountChange={handleAmountFromChange}
        amountFrom={parsedAmount0}
        tokenFrom={tokenFrom}
        token0USD={token0USD}
        availableTokens={availableTokens}
      />

      <button type="button" className="icon switch" onClick={handleSwitch}>
        <img src="/images/swap.svg" alt="switch" />
      </button>

      <ToFieldset
        handleTokenChange={handleTokenToChange}
        handleAmountChange={handleAmountToChange}
        amountTo={parsedAmount1}
        tokenTo={tokenTo}
        token1USD={token1USD}
        availableTokens={availableTokens}
      />

      {isConnected ? (
        <div className="actions">
          {tokenFrom.symbol !== "ETH" &&
          allowance &&
          new BigNumber(allowance).lt(
            toWei(parsedAmount0, tokenFrom.decimals)
          ) ? (
            <button
              type="button"
              className="button firm-voice"
              disabled={approveLoading}
              onClick={handleApprove}
            >
              {approveLoading ? "Approving..." : "Approve swap"}
            </button>
          ) : (
            <button
              type="button"
              className="button firm-voice"
              disabled={loading}
              onClick={handleSwap}
            >
              {loading ? "Swapping..." : "Swap"}
            </button>
          )}
        </div>
      ) : (
        <Wallet />
      )}

      <InfoBox
        oraclePrice={oraclePrice}
        dexPrice={dexPrice}
        deviation={deviation}
        amountToSwap={amountToSwap}
      />
    </form>
  );
};

export default Swap;
