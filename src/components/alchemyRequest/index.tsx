// src/components/alchemyRequest/index.tsx
"use client";
import React, { useState } from 'react';
import { useAlchemyRequest } from '@/hooks/useAlchemyRequest';
import { Input, Button, Text, VStack, Box, HStack } from '@chakra-ui/react';
import NftSelector from '@/components/nftSelector';
import AlchemyLink from '@/components/alchemyLink';
import styles from './style.module.css';

const AlchemyRequest = () => {
    const [apiKey, setApiKey] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [collectionAddress, setCollectionAddress] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const { nfts, loading, error, fetchNFTs } = useAlchemyRequest();
    const [showAlchemyLink, setShowAlchemyLink] = useState(false);
    const [newCollectionAddress, setNewCollectionAddress] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsFormSubmitted(true);
        await fetchNFTs(apiKey, userAddress, collectionAddress);
    };

    const handleChangeCollection = async () => {
        if (newCollectionAddress) {
            await fetchNFTs(apiKey, userAddress, newCollectionAddress);
            setCollectionAddress(newCollectionAddress);
            setNewCollectionAddress('');
        }
    };

    return (
        <div className={styles.container}>
            <Text className={styles.title}>Burner 🔥</Text>
            {!isFormSubmitted ? (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <VStack spacing={4}>
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
                        <Button type="submit" colorScheme="blue">Connect</Button>
                    </VStack>
                </form>
            ) : (
                <Box mb={4}>
                    <HStack spacing={2}>
                        <Input
                            variant="unstyled"
                            type="text"
                            placeholder="New Collection Address"
                            value={newCollectionAddress}
                            onChange={(e) => setNewCollectionAddress(e.target.value)}
                            className={styles.input}
                        />
                        <Button onClick={handleChangeCollection} colorScheme="blue">
                            Change Collection
                        </Button>
                    </HStack>
                </Box>
            )}
            <Box>
                {loading && <p className={styles.loading}>Loading...</p>}
                {error && <p className={styles.error}>{error}</p>}
                {nfts.length > 0 && (
                    <NftSelector nfts={nfts} collectionAddress={collectionAddress} isConnected={isFormSubmitted} />
                )}
            </Box>
        </div>
    );
};

export default AlchemyRequest;