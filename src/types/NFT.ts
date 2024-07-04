// src/types/NFT.ts
export interface NFT {
    title: string;
    id: {
        tokenId: string;
    };
    media: {
        gateway: string;
    }[];
}
