import React, { useState } from 'react';
import { Connection, PublicKey, WalletSigner } from '@solana/web3.js';

const CreateNFTForm = ({ connection, wallet }: { connection: Connection; wallet: WalletSigner }) => {
    const [role, setRole] = useState('');
    const [id, setId] = useState('');

    const mintNFT = async () => {
        try {
            const programId = new PublicKey('your_program_id_here');
            const minProgramId = new PublicKey('your_mint_program_id_here');

            // Call the mint instruction
            const tx = await program.rpc.mintNFT(role, parseInt(id), {
                accounts: {
                    mint: mintProgramId,
                    user: wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                },
                signers: [wallet],
            });

            console.log('NFT minted successfully:', tx);
        } catch (error) {
            console.error('Error minting NFT:', error);
        }
    };

    return (
        <div>
            <label htmlFor="role">Role:</label>
            <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} />

            <label htmlFor="id">ID:</label>
            <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} />

            <button onClick={mintNFT}>Create NFT</button>
        </div>
    );
};

export default CreateNFTForm;
