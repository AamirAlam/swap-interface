export default function Remove(props) {
  return (
    <section>
     

      <fieldset>
      <button type="button" onClick={props.handleBack} className="button ">Back</button>
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

        <button type="button" onClick={props.handleMax} className="button voice">max</button>
      </fieldset>
    </section>
  );
}
