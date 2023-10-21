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
		  <inner-column>
			<h1 className="booming-voice">
			  <span className="gradient-text">Pools</span>
			</h1>
		  </inner-column>
		 </section>

	

      <section>
        <inner-column>
          <PoolForm />
        </inner-column>
      </section>



	 </>
  );
};

export default Pools;

	