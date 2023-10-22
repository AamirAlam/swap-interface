import { useMemo } from "react";
import { formatCurrency, fromWei } from "../hooks/helpers";
import { usePools } from "../hooks/usePools";

export default function Position({token0, token1, handleRemove}) {


  const {balances,lpBalance,pairAddress,pairDecimals} = usePools(token0, token1);


  const token0Balance = useMemo(() => {
    return fromWei(balances?.[token0?.address?.toLowerCase()], token0.decimals)
  },[token0, balances] )

  const token1Balance = useMemo(() => {
    return fromWei(balances?.[token1?.address?.toLowerCase()], token1.decimals)
  },[token1, balances] )


  return (
    <section>
     
      <fieldset>
        <div style={{display:'flex', alignItems:'flex-start', flexDirection:'column', width:400 }}>
            <div>
            {token0.symbol}-{token1.symbol} LP Balance: {formatCurrency(fromWei(lpBalance, pairDecimals), 4 )}
            </div>
            <div>
         Balance: {formatCurrency(token0Balance, 4) }
            </div>
            <div>
              {token1.symbol} Balance: {formatCurrency(token1Balance, 4)}
            </div>

            <button style={{marginTop:30}} onClick={handleRemove} className="button firm-voice">Remove liquidity</button>
        </div>
      </fieldset>
    </section>
  );
}
