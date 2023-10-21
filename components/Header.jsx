import Wallet from "./Wallet";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <inner-column>
        <mast-head>
          <ul className="site-nav">
            <li>
              <Link className="text" href="/">
                Swap
              </Link>
            </li>

            <li>
              <Link className="text" href="/pools">
                Pools
              </Link>
            </li>
          </ul>
          <Wallet />
        </mast-head>
      </inner-column>
    </header>
  );
}
