import { useMemo } from "react";
import { formatCurrency, fromWei } from "../hooks/helpers";
import { usePools } from "../hooks/usePools";

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
          <span>{formatCurrency(fromWei(lpBalance, pairDecimals), 4)}</span>
        </li>

        <li className="solid-voice">
          {token0.symbol} Balance:{" "}
          <span>{formatCurrency(token0Balance, 4)}</span>
        </li>

        <li className="solid-voice">
          {token1.symbol} Balance:{" "}
          <span>{formatCurrency(token1Balance, 4)}</span>
        </li>
      </ul>
    </section>
  );
}
