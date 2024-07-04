// src/components/AlchemyRequest.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useAlchemyRequest } from '../hooks/useAlchemyRequest';
import NftSelector from './NftSelector';
import { NFT } from '@/types/NFT';

const AlchemyRequest = () => {
    const [apiKey, setApiKey] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [collectionAddress, setCollectionAddress] = useState('');
    const { nfts, loading, error } = useAlchemyRequest(apiKey, userAddress, collectionAddress);
    const [isConnected, setIsConnected] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (userAddress && collectionAddress) {
            setIsConnected(true);
        }
    }, [userAddress, collectionAddress]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem',
                maxWidth: '1100px',
                margin: '0 auto',
                textAlign: 'center',
            }}
        >
            <h1>Alchemy Request</h1>
            <h2>Enter your details</h2>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <input
                    type="text"
                    placeholder="RPC API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                />
                <input
                    type="text"
                    placeholder="User Address"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                />
                <input
                    type="text"
                    placeholder="Collection Address"
                    value={collectionAddress}
                    onChange={(e) => setCollectionAddress(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                />
                {/* <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Submit</button> */}
            </form>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {nfts.length > 0 && (
                <NftSelector nfts={nfts} collectionAddress={collectionAddress} isConnected={isConnected} />
            )}
        </div>
    );
};

export default AlchemyRequest;
