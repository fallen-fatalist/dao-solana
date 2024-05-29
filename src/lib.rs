// Define the NFT metadata structure
#[derive(Accounts)]
pub struct NFTMetadata {
    pub role: String,
    pub id: u64,
}

// Define the program
#[program]
pub mod nft_program {
    use super::*;

    // Instruction to mint NFT
    pub fn mint_nft(ctx: Context<MintNFT>, role: String, id: u64) -> ProgramResult {
        let mint = &mut ctx.accounts.mint;

        // Initialize the NFT metadata
        mint.role = role;
        mint.id = id;

        Ok(())
    }

    // Accounts required for minting NFT
    pub struct MintNFT<'info> {
        #[account(init, payer = user, space = 8 + 8)]
        pub mint: ProgramAccount<'info, NFTMetadata>,
        pub user: Signer<'info>,
        pub system_program: Program<'info, System>,
    }
}

