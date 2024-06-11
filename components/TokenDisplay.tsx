import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection,  } from '@solana/web3.js';
import {FC, useEffect, useState } from 'react';
import { getWalletNfts, NftData } from '../pages/api/nft';
import { log } from 'console';
import {
    fetchCandyMachine,
    fetchCandyGuard,
  } from '@metaplex-foundation/mpl-candy-machine'
import { token } from '@metaplex-foundation/js';

export const TokenDisplay: FC = () => {
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [owner, setOwner] = useState("");
    const [tokenAddress, setTokenAddress] = useState("");

    const { connection } = useConnection();
    const [walletConnected, setWalletConnected] = useState(false);
    const { publicKey } = useWallet();
    

    useEffect(() => {
        if (!connection || !publicKey) { return }

        const fetchToken = async () => {
            try {
              const tokensRaw = await (await getWalletNfts(connection, publicKey)).items;
              const tokenRaw = tokensRaw[tokensRaw.length - 1];
              const id = tokenRaw.id;
              const url = tokenRaw.content.json_uri;
              const NFTMetaData = await fetch(url).then((res) => res.json());
              NFTMetaData.address = id;
              setRole(NFTMetaData.role);
              setOwner(NFTMetaData.owner);
              setTokenAddress(NFTMetaData.id);
              setAddress(publicKey.toString());
            } catch (error) {
              console.error('Error fetching tokens:', error);
            }
          };
        fetchToken()
        // TODO: Change to NFT token logic or remove
        // Ensure the balance updates after the transaction completes

    }, [walletConnected, publicKey])
    

    return (
        <div>
            <p>{address ? `Tokens owner address: ${address}` : ''}</p>
            <h3>Token:</h3>
            <p>Address: {tokenAddress}</p>
            <p>Owner: {owner}</p>
            <p>Role: {role}</p>
        </div>
    )
}

  

  