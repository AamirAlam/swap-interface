import type { NextPage } from "next";

import Head from "next/head";
import PoolForm from "../components/PoolForm/PoolForm";
import Position from "../components/Position";

const Pools: NextPage = () => {
  return (
    <>
       <Head>
        <title>Pools</title>
		  <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/images/swap.svg" rel="icon" />

		  <meta property="og:image" content="/images/swap-meta.jpg" />

        <meta content="API3's Demo of its Oracle for Swapping and Liquidity" name="description" />

		  <meta property="og:locale" content="en_US" />
		  

		  {/* theme color */}
		  <meta name="theme-color" content="#a785e2" />




      </Head>

      <section>
        <div className="inner-column">
          <h1 className="booming-voice">
            <span className="gradient-text">Pools</span>
          </h1>
        </div>
      </section>

      <section>
        <div className="inner-column">
          <PoolForm />
        </div>
      </section>
    </>
  );
};

export default Pools;
