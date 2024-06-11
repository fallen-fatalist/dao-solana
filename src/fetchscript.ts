import { publicKey } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';

const umi = createUmi('https://api.devnet.solana.com').use(dasApi());
let owner = publicKey('8XrrhP3v2JSy2PMyv9SEfuv4V9jrFNenFab8uMvnitjj');

umi.rpc.getAssetsByOwner({
    owner,
    limit: 10
}).then(
    (nfts) => {
        for(let i=0; i< nfts.items.length; i++){
            console.log(nfts.items[i]); //use i instead of 0
        }

    }
)