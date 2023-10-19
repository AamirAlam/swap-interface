//styling in style/form.css



// src/components/Swap.js
import React, { useMemo, useState } from "react";
import FromFieldset from "./FromFieldset";
import ToFieldset from "./ToFieldset";
import InfoBox from "./InfoBox";

//
import { SWAP_TYPE } from "../../hooks/constants";
import { useContractCalls } from "../../hooks/useContractCalls";
import { useSwapCallbacks } from "../../hooks/useSwapCallbacks";
import { fromWei, toWei } from "../../hooks/helpers";
import BigNumber from "bignumber.js";
import { useApproveCallbacks } from "../../hooks/useApproveCallbacks";
import { usePools } from "../../hooks/usePools";

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

  const path = useMemo(() => {
    return swapType === SWAP_TYPE.FROM
      ? [tokenFrom.address, tokenTo.address]
      : [tokenTo.address, tokenFrom.address];
  }, [tokenFrom, tokenTo, swapType]);

  const {
    allowance,
    tradeQuote: {
      deviation,
      dexPrice,
      oraclePrice,
      token0Amount: token0Quote,
      token1Amount: token1Quote,
    },
  } = useContractCalls(
    tokenFrom,
    tokenTo,
    amountToSwap,
    amountToReceive,
    path,
    swapType
  );

  const {} = usePools(tokenFrom, tokenTo);

  const { swapTokens, loading, trxHash } = useSwapCallbacks();
  const {
    approve,
    loading: approveLoading,
    trxHash: approveHash,
  } = useApproveCallbacks(tokenFrom);



  //
  const handleTokenFromChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    console.log("token change ", event.target.value);
    setTokenFrom(availableTokens?.[parseInt(event.target.value.toString())]);
  };

  const handleTokenToChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTokenTo(availableTokens?.[parseInt(event.target.value.toString())]);
  };


  //
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


  //

  const handleSwitch = (event: React.MouseEvent<HTMLButtonElement>) => {
	//console.log("switching");
	event.preventDefault();
	// switch logic 
	 
  };



  //
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




  const handleSwap = async () => {
    // Perform the token swap logic here
    console.log(
      `Swapping ${amountToSwap} ${tokenFrom} to ${amountToReceive} ${tokenTo}`
    );

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
    <form>
      <FromFieldset
        handleTokenChange={handleTokenFromChange}
        handleAmountChange={handleAmountFromChange}
        amountFrom={parsedAmount0}
        tokenFrom={tokenFrom}
        availableTokens={availableTokens}
      />

      <button className="icon switch" onClick={handleSwitch}>
			<img src="/images/swap.svg" alt="" />
      </button>

      <ToFieldset
        handleTokenChange={handleTokenToChange}
        handleAmountChange={handleAmountToChange}
        amountTo={parsedAmount1}
        tokenTo={tokenTo}
        availableTokens={availableTokens}
      />

  

	




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
