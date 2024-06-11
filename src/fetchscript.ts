import { publicKey } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';

const umi = createUmi('https://api.devnet.solana.com').use(dasApi());
const owner = publicKey('8XrrhP3v2JSy2PMyv9SEfuv4V9jrFNenFab8uMvnitjj');


async function main() {
    const rawNfts = (await umi.rpc.getAssetsByOwner({
        owner,
        limit: 10
    })).items;

    for (let i = 0; i < rawNfts.length; i++ ){
        console.log(rawNfts[i].id);
        const url = rawNfts[i].content.json_uri;
        const NFTMetaData = await fetch(url).then((res) => res.json());
    }    
}

main();
