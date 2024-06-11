import React, { useState, useEffect } from 'react';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { connection, getProgram, web3 } from './solana';
import styles from '../styles/Home.module.css'
import { AppBar } from './AppBar';
import App from 'next/app';

function Vote() {
  const { publicKey } = useWallet();
  const wallet = useAnchorWallet();
  const [voteBanks, setVoteBanks] = useState([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (publicKey) {
      setIsWalletConnected(true);
    } else {
      setIsWalletConnected(false);
    }
    setIsLoading(false);
  }, [publicKey]);

  const vote = async (voteForGm, voteBankAddress) => {
    if (!wallet || !publicKey) {
      alert('Please connect your wallet first.');
      return;
    }

    try {
      const program = getProgram(wallet);
      const tx = await program.methods
        .gibVote(voteForGm)
        .accounts({ voteAccount: voteBankAddress, signer: publicKey })
        .signers([])
        .rpc();

      console.log('Voted successfully:', tx);
      // You can update UI or display a message here after successful voting
    } catch (error) {
      console.error('Failed to vote:', error);
      // You can display an error message or handle the error in some way
    }
  };

  const createVoteBank = async () => {
    if (!wallet || !publicKey) {
      alert('Please connect your wallet first.');
      return;
    }

    try {
      const program = getProgram(wallet);
      const voteBank = web3.Keypair.generate();
      const tx = await program.methods
        .initVoteBank()
        .accounts({
          voteAccount: voteBank.publicKey,
          signer: publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .signers([voteBank])
        .rpc();

      setVoteBanks((prevVoteBanks) => [...prevVoteBanks, voteBank.publicKey.toString()]);

      console.log('Vote bank created with TxHash:', tx);
    } catch (error) {
      console.error('Failed to create vote bank:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.App}>
      <header className="App-header">
        {isWalletConnected ? (
          <div className={styles.AppBody}>
            <button onClick={createVoteBank}>Create Vote Bank</button>
            <ul>
              {voteBanks.map((voteBankAddress, index) => (
                <div>
                <li key={index}>
                  Vote Bank {index + 1}: {voteBankAddress}
                  <div className={styles.header}>
                    <button onClick={() => vote(true, voteBankAddress)}>Vote for GM</button>
                    <button onClick={() => vote(false, voteBankAddress)}>Vote for GN</button>

                  </div>
                </li>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <p>Please connect your wallet.</p>
        )}
      </header>
    </div>
  );
}

export default Vote;
