import { formatCurrency } from "../../hooks/helpers";


export default function FromFieldset(props) {

  const handleTokenChange = (e) => {
    props.handleTokenChange(e);
  };

  const handleAmountChange = (e) => {
    props.handleAmountChange(e);
  };

  return (
    <fieldset className="">
      <form-field class="dropdown">
        <label className="whisper-voice" htmlFor="tokenFrom">
          From
        </label>
        <select name="swap-from" id="tokenFrom" onChange={handleTokenChange}>
          {props.availableTokens.map((token, index) => (
            <option
              selected={token.symbol === props?.tokenFrom?.symbol}
              key={token.symbol}
              value={index}
            >
              {/* <picture>
                <img src={token.icon} alt={token.name} />
              </picture> */}
              {token.symbol}
            </option>
          ))}
        </select>
      </form-field>

      <form-field class="number">
        <label className="solid-voice" htmlFor="amountFrom">
          You pay: ${formatCurrency(props.token0USD)}
        </label>

        <input
          id="amountFrom"
          type="number"
          value={props.amountFrom}
          // step="0.01"
          min="0"
          onChange={handleAmountChange}
          className="notice-voice"
        />
        {/* <p className="in-dollars">
          ${" "}
          {props.tokenFrom.rate
            ? props.amountFrom * props.tokenFrom.rate
            : "Select a token"}
        </p> */}
      </form-field>
    </fieldset>
  );
}
