import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import {FC, useEffect, useState } from 'react'

export const BalanceDisplay: FC = () => {
    const [token, setToken] = useState(0);
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    useEffect(() => {
        if (!connection || !publicKey) { return }

        // TODO: Change to NFT token logic or remove
        // Ensure the balance updates after the transaction completes
        connection.onAccountChange(
            publicKey, 
            (updatedAccountInfo) => {
                setToken(updatedAccountInfo.lamports / LAMPORTS_PER_SOL)
            }, 
            'confirmed'
        )

        // TODO: Change to NFT token update
        connection.getAccountInfo(publicKey).then(info => {
            setToken(info.lamports);
        })
    }, [connection, publicKey])

    // TODO: change 
    return (
        <div>
            
            <p>{publicKey ? `Token owner: ${token}` : ''}</p>
        </div>
    )
}