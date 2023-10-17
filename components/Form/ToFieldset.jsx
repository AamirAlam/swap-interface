export default function ToFieldset(props) {
  // handlers
  const handleTokenChange = (e) => {
    props.handleTokenChange(e);
  };

  const handleAmountChange = (e) => {
    props.handleAmountChange(e);
  };

  return (
    <fieldset className="swap-to offset-background">
      <form-field class="dropdown">
        <label className="whisper-voice" htmlFor="tokenTo">
          To
        </label>
        <select name="swap-to" id="tokenTo" onChange={handleTokenChange}>
          {props.availableTokens.map((token) => (
            <option key={token.name} value={token.chainId}>
              {token.name}
            </option>
          ))}
        </select>
      </form-field>

      <form-field class="number">
        <label className="solid-voice" htmlFor="amountTo">
          You Recieve
        </label>

        <input
          id="amountTo"
          type="number"
          value={props.amountTo}
          step="0.01"
          min="0.01"
          onChange={handleAmountChange}
          className="notice-voice"
        />
        <p className="in-dollars">
          ${" "}
          {props.tokenTo.rate
            ? props.amountTo * props.tokenTo.rate
            : "Select a token"}
        </p>
      </form-field>
    </fieldset>
  );
}
