// src/hooks/useAlchemyRequest.ts
import { useState } from 'react';
import { NFT } from '@/types/NFT';

export const useAlchemyRequest = () => {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNFTs = async (apiKey: string, userAddress: string, collectionAddress: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://polygon-mainnet.g.alchemy.com/v2/${apiKey}/getNFTs/?owner=${userAddress}&contractAddresses[]=${collectionAddress}`);
            const data = await response.json();
            setNfts(data.ownedNfts);
        } catch (err) {
            setError('Failed to fetch NFTs');
        } finally {
            setLoading(false);
        }
    };

    return { nfts, loading, error, fetchNFTs };
};