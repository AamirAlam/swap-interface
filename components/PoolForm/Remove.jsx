export default function Remove(props) {
  return (
    <section className="remove">
      <text-content>
        <h2 className="attention-voice">Remove</h2>
        <p></p>
      </text-content>

      <fieldset>
        <form-field class="number">
          <label className="solid-voice" htmlFor="amountFrom">
            LP Token Amount
          </label>

          <input
            id="amountFrom"
            type="number"
            value={props.lpAmount}
            onChange={props.handleLpAmountChange}
            className="notice-voice"
          />
        </form-field>

        <div className="actions">
          <button onClick={props.handleMax} className="text whisper-voice">
            Use max
          </button>
        </div>
      </fieldset>
    </section>
  );
}
