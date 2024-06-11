import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'


export const SendSolForm: FC = () => {
    const [txSig, setTxSig] = useState('');
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
   

    const sendToken = event => {
        event.preventDefault()
        if (!connection || !publicKey) { return }
        
    }

    return (
        <div>
            {
                publicKey ?
                    <form onSubmit={sendToken} className={styles.form}>
                        <label htmlFor="address">Employee address:</label>
                        <input id="address" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                        <br />
                        <label htmlFor="owner">Employee name:</label>
                        <input id="owner" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                        <br />
                        <label htmlFor="role">Role assign to:</label>
                        <input id="role" type="text" className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                        <button type="submit" className={styles.formButton}>Give token</button>
                    </form> :
                    <span>Connect Your Wallet</span>
            }
        </div>
    )
}