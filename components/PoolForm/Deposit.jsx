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
            You pay
          </label>

          <input
            id="amountFrom"
            type="number"
            value={props.amountToSwap}
            onChange={props.handleAmountFromChange}
            className="notice-voice"
          />
        </form-field>

        <form-field class="number">
          <label className="solid-voice" htmlFor="amountTo">
            You receive
          </label>

          <input
            id="amountTo"
            type="number"
            value={props.amountToReceive}
            onChange={props.handleAmountToChange}
            className="notice-voice"
          />
        </form-field>
      </fieldset>
    </section>
  );
}
