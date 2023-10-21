import React, { useState } from "react";
import Tokens from "./Tokens";
import Deposit from "./Deposit";

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
  const [tokenFrom, setTokenFrom] = useState(availableTokens[0]);
  const [tokenTo, setTokenTo] = useState(availableTokens[1]);
  const [amountToSwap, setAmountToSwap] = useState("");
  const [amountToReceive, setAmountToReceive] = useState("");

  //handlers

  const handleTokenFromChange = (e) => {};

  const handleTokenToChange = (e) => {};

  const handleAmountFromChange = (e) => {};

  const handleAmountToChange = (e) => {};

  return (
    <form className="pool-form">
      <Tokens
        tokenFrom={tokenFrom}
        tokenTo={tokenTo}
        availableTokens={availableTokens}
        handleTokenFromChange={handleTokenFromChange}
        handleTokenToChange={handleTokenToChange}
      />

      <Deposit
        amountToSwap={amountToSwap}
        amountToReceive={amountToReceive}
        handleAmountFromChange={handleAmountFromChange}
        handleAmountToChange={handleAmountToChange}
      />

      <div className="actions">
        <button className="button firm-voice">Add Liquidity</button>
      </div>
    </form>
  );
}
