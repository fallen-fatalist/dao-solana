import React, { FC, useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

interface DisplayTokenInfoProps {
  name: string;
}

export const DisplayTokenInfo: FC<DisplayTokenInfoProps> = ({ name }) => {
  const [tokenRole, setTokenRole] = useState<string>("");
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (!connection || !publicKey) return;

      const accountInfo = await connection.getAccountInfo(publicKey);
      if (accountInfo?.data) {
        // Assume the data contains the role as a UTF-8 string for simplicity
        const role = new TextDecoder().decode(accountInfo.data);
        setTokenRole(role);
      }
    };

    fetchTokenInfo();
  }, [connection, publicKey]);

  return (
    <div>
      <p>Token owner: {name || "Unnamed"}</p>
      <p>{publicKey ? `Token owner role: ${tokenRole || "No role"}` : ""}</p>
      <p>Created: {new Date().toLocaleString()}</p>
      <button class="btn btn-primary">Create role</button>
      <button class="btn btn-primary">Create vote</button>
      <button class="btn btn-primary">List votes</button>
    </div>
  );
};

