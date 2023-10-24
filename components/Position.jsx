import { useMemo } from "react";
import { formatCurrency, fromWei } from "../hooks/helpers";
import { usePools } from "../hooks/usePools";
import BigNumber from "bignumber.js";

export default function Position({ token0, token1, handleRemove }) {
  const { balances, lpBalance, pairAddress, pairDecimals } = usePools(
    token0,
    token1
  );

  const token0Balance = useMemo(() => {
    return fromWei(balances?.[token0?.address?.toLowerCase()], token0.decimals);
  }, [token0, balances]);

  const token1Balance = useMemo(() => {
    return fromWei(balances?.[token1?.address?.toLowerCase()], token1.decimals);
  }, [token1, balances]);

  return (
    <section>
      <text-content>
        <h2 className="attention-voice">Position</h2>
        <p></p>
      </text-content>

      <ul className="info-box">
        <li className="solid-voice">
          LP Balance:{" "}
          <span>{formatCurrency(fromWei(lpBalance, pairDecimals))}</span>
        </li>

        <li className="solid-voice">
          {token0.symbol} Balance:{" "}
          <span>{formatCurrency(token0Balance,  new BigNumber(token0Balance).lt(1) ?  5 : 2)}</span>
        </li>

        <li className="solid-voice">
          {token1.symbol} Balance:{" "}
          <span>{formatCurrency(token1Balance,  new BigNumber(token1Balance).lt(1) ? 5 : 2)}</span>
        </li>
      </ul>
    </section>
  );
}
