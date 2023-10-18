import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import Swap from "../components/Form/Swap";
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>API3 Swap</title>
        <meta content="API3 swap demo" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Header />

      <Main />

      <Footer />
    </>
  );
};

export default Home;
