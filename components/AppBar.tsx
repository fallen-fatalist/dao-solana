import { FC } from 'react'
import styles from '../styles/Home.module.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'

export const AppBar: FC = () => {
    return (
        <div className={styles.AppHeader}>
            <img src="/solanaLogo.png" height={30} width={200} />
            <span>Decentralized Autonomous Application</span>
            <WalletMultiButton />
        </div>
    )
}