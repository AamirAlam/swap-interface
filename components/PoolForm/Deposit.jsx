export default function Deposit(props) {
  return (
    <section>
      <text-content>
        <h2 className="attention-voice">Deposit</h2>
        <p>Select the amount of tokens you want to deposit</p>
      </text-content>

      <fieldset>
        <form-field class="number">
          <label className="solid-voice" htmlFor="amountFrom">
            Deposit {props.token0.symbol}
          </label>

          <input
            id="amountFrom"
            type="number"
            value={props.token0Amount}
            onChange={props.handleAmount0Change}
            className="notice-voice"
            min={0}
          />
        </form-field>

        <form-field class="number">
          <label className="solid-voice" htmlFor="amountTo">
             Deposit {props.token1.symbol} 
          </label>

          <input
            id="amountTo"
            type="number"
            value={props.token1Amount}
            onChange={props.handleAmount1Change}
            className="notice-voice"
            min={0}
          />
        </form-field>
      </fieldset>
    </section>
  );
}
