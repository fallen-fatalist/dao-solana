import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import WalletContextProvider from "../components/WalletContextProvider";
import { AppBar } from "../components/AppBar";
import { DisplayTokenInfo } from "../components/DisplayTokenInfo";
import { CreateTokenAccountForm } from "../components/CreateTokenAccount";
import Head from "next/head";

const Home: NextPage = (props) => {
  return (
    <div className={styles.App}>
      <Head>
        <title>dao application</title>
        <meta name="description" content="Decentralized Autonomous Organization App" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
        <DisplayTokenInfo/>
        </div>
      </WalletContextProvider>
    </div>
  );
};

export default Home;
