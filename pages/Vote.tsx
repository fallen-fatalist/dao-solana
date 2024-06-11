import React from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import Vote from '../components/Voting';
import '@solana/wallet-adapter-react-ui/styles.css'; // Default styles
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { NextPage } from 'next';
import Fetch from '../components/Fetch';

const endpoint = clusterApiUrl('devnet'); // or 'mainnet-beta' or 'testnet'
const wallets = [
  new PhantomWalletAdapter(),
  // Add other wallets you want to support here
];

const Voting : NextPage = () => {
  return (
    <div>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Vote />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};

export default Voting;
