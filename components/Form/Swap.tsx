// src/components/Swap.js
import React, { useState } from "react";
import FromFieldset from "./FromFieldset";
import ToFieldset from "./ToFieldset";

const Swap = () => {
  const [tokenFrom, setTokenFrom] = useState("1");
  const [tokenTo, setTokenTo] = useState("2");
  const [amountToSwap, setAmountToSwap] = useState("");
  const [amountToReceive, setAmountToReceive] = useState("");

  const availableTokens = [
	{
	  name: "ETH",
	  chainId: 1,
	  icon: "ethereum.svg",
	  rate: 1560.56,
	},
	{
		name: "DAI",
		chainId: 2,
		icon: "usdc.svg",
		rate: 1.0,
	 },
	{
	  name: "USDC",
	  chainId: 3,
	  icon: "usdc.svg",
	  rate: 1.0,
	},
	{
	  name: "Matic",
	  chainId: 4,
	  icon: "matic.svg",
	  rate: 0.5169,
	},
 ];
  

  const handleTokenFromChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTokenFrom(event.target.value);
  };

  const handleTokenToChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTokenTo(event.target.value);
  };

  const handleAmountFromChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAmountToSwap(event.target.value);
  };

  const handleAmountToChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAmountToReceive(event.target.value);
  };


  const handleSwap = (event) => {
	//reverse the from and to values
	event.preventDefault();
	
	const temp = tokenFrom;
	setTokenFrom(tokenTo);
	setTokenTo(temp);
 };

  const handSubmit = () => {
    // Perform the token swap logic here
    console.log(
      `Swapping ${amountToSwap} ${tokenFrom} to ${amountToReceive} ${tokenTo}`
    );
    // You can call a function to execute the swap here
  };

  return (
   <form onSubmit={handSubmit}>
      <FromFieldset
		handleTokenChange={handleTokenFromChange}
		handleAmountChange={handleAmountFromChange}
		amountFrom={amountToSwap}
		tokenFrom={tokenFrom}
		availableTokens={availableTokens}
		/>

      <button className=" icon" onClick={handleSwap}>
			<img src="/images/swap.svg" alt="" />
      </button>

      <ToFieldset 
		handleTokenChange={handleTokenToChange}
		handleAmountChange={handleAmountToChange}
		amountTo={amountToReceive}
		tokenTo={tokenTo}
		availableTokens={availableTokens}
		/>

      <div className="actions">
        <button className="button firm-voice" type="submit">
          Swap
        </button>
      </div>
    </form>
  );
};

export default Swap;
