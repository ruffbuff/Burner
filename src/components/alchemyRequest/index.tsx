// src/components/alchemyRequest/index.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useAlchemyRequest } from '@/hooks/useAlchemyRequest';
import { Input, Button, Text, VStack, Box } from '@chakra-ui/react';
import NftSelector from '@/components/nftSelector';
import AlchemyLink from '@/components/alchemyLink';
import styles from './style.module.css';

const AlchemyRequest = () => {
    const [apiKey, setApiKey] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [collectionAddress, setCollectionAddress] = useState('');
    const { nfts, loading, error } = useAlchemyRequest(apiKey, userAddress, collectionAddress);
    const [isConnected, setIsConnected] = useState(false);
    const [showAlchemyLink, setShowAlchemyLink] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsConnected(true);
    };

    useEffect(() => {
        if (userAddress && collectionAddress) {
            setIsConnected(true);
        }
    }, [userAddress, collectionAddress]);

    return (
        <div className={styles.container}>
            <Text className={styles.title}>Burner 🔥</Text>
            <form className={styles.form}>
                <VStack onSubmit={handleSubmit} spacing={4}>
                    <Input
                        variant="unstyled"
                        type="text"
                        placeholder="RPC API Key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className={styles.input}
                        onFocus={() => setShowAlchemyLink(true)}
                        onBlur={() => setShowAlchemyLink(false)}
                    />
                    <AlchemyLink />
                    <Input
                        variant="unstyled"
                        type="text"
                        placeholder="User Address"
                        value={userAddress}
                        onChange={(e) => setUserAddress(e.target.value)}
                        className={styles.input}
                    />
                    <Input
                        variant="unstyled"
                        type="text"
                        placeholder="Collection Address"
                        value={collectionAddress}
                        onChange={(e) => setCollectionAddress(e.target.value)}
                        className={styles.input}
                    />
                    <Box
                    >
                        {loading && <p className={styles.loading}>Loading...</p>}
                        {error && <p className={styles.error}>{error}</p>}
                        {nfts.length > 0 && (
                            <NftSelector nfts={nfts} collectionAddress={collectionAddress} isConnected={isConnected} />
                        )}
                    </Box>
                </VStack>
            </form>
        </div>
    );
};

export default AlchemyRequest;