import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { AnchorProvider, Program, web3 } from '@project-serum/anchor';
import idl from '../dao/solana/idl.json'; // Import your IDL file

const endpoint = 'https://api.devnet.solana.com';
const connection = new Connection(endpoint);

const programID = new PublicKey('76Qhe4iyEHY8VfPz4QqMBWk1JVYakNpDWJQ6R6yhy8jY');

const getProvider = (wallet) => {
  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  );
  return provider;
};

const getProgram = (wallet) => {
  const provider = getProvider(wallet);
    // @ts-ignore
  const program = new Program(idl, programID, provider);
  return program;
};

export { connection, getProvider, getProgram, web3 };
