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
            Token 1
          </label>
          <select
            name="pool-from"
            id="tokenFrom"
            // value={props.tokenFrom}
            onChange={props.handleToken0Change}
          >
            {props.availableTokens.map((token, index) => (
              <option
                key={token.id}
                value={index}
                selected={token.symbol === props?.token0?.symbol}
              >
                {token.symbol}
              </option>
            ))}
          </select>
        </form-field>

        <form-field class="dropdown">
          <label className="whisper-voice" htmlFor="tokenTo">
            Token 2
          </label>
          <select
            // value={props.tokenTo}
            name="pool-to"
            id="tokenTo"
            onChange={props.handleToken1Change}
          >
            {props.availableTokens.map((token, index) => (
              <option
                key={token.id}
                value={index}
                selected={token.symbol === props?.token1?.symbol}
              >
                {token.symbol}
              </option>
            ))}
          </select>
        </form-field>
      </fieldset>
    </section>
  );
}
