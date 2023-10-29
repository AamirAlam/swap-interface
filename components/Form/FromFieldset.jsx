import { formatCurrency } from "../../hooks/helpers";

//styling in style/form.css
import Dropdown from "../Dropdown";

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
        <Dropdown
          selected={props.tokenFrom}
          options={props.availableTokens}
          handleTokenChange={props.handleTokenChange}
        />
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
