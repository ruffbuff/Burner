// src/hooks/useAlchemyRequest.ts
import { useState, useEffect } from 'react';
import { NFT } from '@/types/NFT';

export const useAlchemyRequest = (apiKey: string, userAddress: string, collectionAddress: string) => {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (apiKey && userAddress && collectionAddress) {
            const fetchNFTs = async () => {
                setLoading(true);
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
            fetchNFTs();
        }
    }, [apiKey, userAddress, collectionAddress]);

    return { nfts, loading, error };
};
