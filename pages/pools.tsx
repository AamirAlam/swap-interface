import type { NextPage } from "next";

import Head from "next/head";
import PoolForm from "../components/PoolForm/PoolForm";

const Pools: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pools</title>
        <meta content="API3 swap demo" name="description" />
        <link href="/images/swap.svg" rel="icon" />
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
