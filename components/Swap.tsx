// src/components/Swap.js
import React, { useState } from "react";

const Swap = () => {
  const [tokenFrom, setTokenFrom] = useState("ETH");
  const [tokenTo, setTokenTo] = useState("DAI");
  const [amountToSwap, setAmountToSwap] = useState("");
  const [amountToReceive, setAmountToReceive] = useState("");

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

  const handleSwap = () => {
    // Perform the token swap logic here
    console.log(
      `Swapping ${amountToSwap} ${tokenFrom} to ${amountToReceive} ${tokenTo}`
    );
    // You can call a function to execute the swap here
  };

  return (
    <div className="swap-container">
      <h2>Token Swap</h2>
      <div className="form-group">
        <label>Select Token to Swap From:</label>
        <select
          className="select-input"
          value={tokenFrom}
          onChange={handleTokenFromChange}
        >
          <option value="ETH">ETH</option>
          <option value="DAI">DAI</option>
          <option value="USDC">USDC</option>
          {/* Add more token options */}
        </select>
      </div>
      <div className="form-group">
        <label>Select Token to Receive:</label>
        <select
          className="select-input"
          value={tokenTo}
          onChange={handleTokenToChange}
        >
          <option value="DAI">DAI</option>
          <option value="ETH">ETH</option>
          <option value="USDC">USDC</option>
          {/* Add more token options */}
        </select>
      </div>
      <div className="form-group">
        <label>Amount to Swap:</label>
        <input
          type="number"
          className="input-field"
          value={amountToSwap}
          onChange={handleAmountFromChange}
        />
      </div>
      <div className="form-group">
        <label>Amount to Receive:</label>
        <input
          type="number"
          className="input-field"
          value={amountToReceive}
          onChange={handleAmountToChange}
        />
      </div>
      <button className="swap-button" onClick={handleSwap}>
        Swap
      </button>
    </div>
  );
};

export default Swap;
