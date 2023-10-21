export default function Tokens(props) {
  return (
    <section>
      <text-content>
        <h2 className="attention-voice">Tokens</h2>
        <p>Which token pair would you like to add liquidity to.</p>
      </text-content>
      <fieldset>
        <form-field class="dropdown">
          <label className="whisper-voice" htmlFor="tokenFrom">
            From
          </label>
          <select
            name="pool-from"
            id="tokenFrom"
            value={props.tokenFrom}
            onChange={props.handleTokenFromChange}
          >
            {props.availableTokens.map((token) => (
              <option key={token.id} value={token}>
                {token.symbol}
              </option>
            ))}
          </select>
        </form-field>

        <form-field class="dropdown">
          <label className="whisper-voice" htmlFor="tokenTo">
            To
          </label>
          <select
            value={props.tokenTo}
            name="pool-to"
            id="tokenTo"
            onChange={props.handleTokenToChange}
          >
            {props.availableTokens.map((token) => (
              <option key={token.id} value={token}>
                {token.symbol}
              </option>
            ))}
          </select>
        </form-field>
      </fieldset>
    </section>
  );
}
