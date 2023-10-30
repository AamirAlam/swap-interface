import Dropdown from "../Dropdown";

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
          <Dropdown
            selected={props.token0}
            options={props.availableTokens}
            handleTokenChange={props.handleToken0Change}
          />
        </form-field>

        <form-field class="dropdown">
          <label className="whisper-voice" htmlFor="tokenTo">
            Token 2
          </label>

          <Dropdown
            selected={props.token1}
            options={props.availableTokens}
            handleTokenChange={props.handleToken1Change}
          />
        </form-field>
      </fieldset>
    </section>
  );
}
