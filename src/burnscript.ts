import { Connection, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import * as token from '@solana/spl-token'

// Establish connection to Solana Devnet
const connection = new Connection('https://api.devnet.solana.com');

// Define the address of the NFT token's mint
const mintAddress = new PublicKey('HgfnderX2LNqVgfwDwpbTEkJP8v6fLeonMmPTd9Hu2yg');

// Define the address of the account that owns the NFT tokens
const ownerAddress = new PublicKey('8XrrhP3v2JSy2PMyv9SEfuv4V9jrFNenFab8uMvnitjj');

// Define the address of the account where tokens will be burned (usually the same as the owner)
const burnerAddress = ownerAddress;

// Define the SPL Token program ID
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

// Create a transaction to burn the NFT tokens
const transaction = new Transaction();

// Define the instruction to burn the tokens
const instruction = Token.createBurnInstruction(
  token.TOKEN_PROGRAM_ID,
  mintAddress,
  ownerAddress,
  burnerAddress,
  [],
  1 // Number of tokens to burn (typically 1 for NFTs)
);

// Add the burn instruction to the transaction
transaction.add(instruction);

// Sign and send the transaction
// Replace <PRIVATE_KEY> with the private key of the account signing the transaction
const signature = await connection.sendTransaction(transaction, [account]);

console.log('Transaction sent:', signature);
