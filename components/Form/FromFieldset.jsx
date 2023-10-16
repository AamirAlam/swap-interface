export default function FromFieldset(props) {
  // handlers

  // token
  const handleTokenChange = (e) => {
    props.handleTokenChange(e);
  };

  //amount
  const handleAmountChange = (e) => {
    props.handleAmountChange(e);
  };

  return (
    <fieldset>
      <form-field class="dropdown">
        <label className="whisper-voice" htmlFor="tokenFrom">
          From
        </label>
        <select name="swap-from" id="tokenFrom" onChange={handleTokenChange}>
          {props.availableTokens.map((token) => (
            <option key={token.name} value={token.chainId}>
              {token.name}
            </option>
          ))}
        </select>
      </form-field>

      <form-field class="number">
        <label className="solid-voice" htmlFor="amountFrom">
          You pay
        </label>

        <input
          id="amountFrom"
          type="number"
          value={props.amountFrom}
          step="0.01"
          min="0.01"
          onChange={handleAmountChange}
          className="notice-voice"
        />
        <p className="in-dollars">
          ${" "}
          {props.tokenFrom.rate
            ? props.amountFrom * props.tokenFrom.rate
            : "Select a token"}
        </p>
      </form-field>
    </fieldset>
  );
}
