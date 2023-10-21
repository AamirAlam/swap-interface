import type { NextPage } from "next";
import Head from "next/head";
import Swap from "../components/Form/Swap";

// import Footer from "../components/Footer";
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Swap</title>
        <meta content="API3 swap demo" name="description" />
        <link href="/images/swap.svg" rel="icon" />
      </Head>

      <section>
        <div className="inner-column">
          <h1 className="booming-voice">
            Oracle Protected <span className="gradient-text">Swap</span>
          </h1>
        </div>
      </section>
      <section>
        <div className="inner-column narrow">
          <Swap />
        </div>
      </section>
    </>
  );
};

export default Home;
