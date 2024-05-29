import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { DaoNft } from "../target/types/dao_nft";

describe("dao-nft", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.DaoNft as Program<DaoNft>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
