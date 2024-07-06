// src/components/NftSelector.tsx
import React, { useState, useEffect } from 'react';
import { Text, Box, Grid, Image, Button, HStack, Skeleton } from '@chakra-ui/react';
import useBurnNFT from '@/hooks/useBurnNFT';
import { NFT } from '@/types/NFT';
import styles from './style.module.css';

interface NftSelectorProps {
    nfts: NFT[];
    collectionAddress: string;
    isConnected: boolean;
}

const NftSelector: React.FC<NftSelectorProps> = ({ nfts, collectionAddress, isConnected }) => {
    const [selectedNfts, setSelectedNfts] = useState<string[]>([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { isLoading: burnLoading, error: burnError, burnNFT } = useBurnNFT();
    const [selectAll, setSelectAll] = useState(false);
    const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});

    const handleBurnClick = async () => {
        if (selectedNfts.length > 0) {
            try {
                await burnNFT(collectionAddress, selectedNfts);
                setSelectedNfts([]);
                setShowSuccessMessage(true);
            } catch (error) {
                console.error("Error burning NFT:", error);
            }
        }
    };

    const handleNftSelect = (tokenId: string) => {
        setSelectedNfts(prevSelectedNfts => {
            if (prevSelectedNfts.includes(tokenId)) {
                return prevSelectedNfts.filter(id => id !== tokenId);
            } else {
                return [...prevSelectedNfts, tokenId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedNfts([]);
        } else {
            setSelectedNfts(nfts.map(nft => nft.id.tokenId));
        }
        setSelectAll(prevSelectAll => !prevSelectAll);
    };

    const handleImageLoad = (tokenId: string) => {
        setLoadedImages(prev => ({ ...prev, [tokenId]: true }));
    };

    useEffect(() => {
        if (showSuccessMessage) {
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage]);

    return (
        <>
            <Box className={styles.stickyHeader}>
                <HStack justifyContent="center" alignItems="center" spacing={2}>
                    <Box className={styles.selectedCounter}>
                        <Text fontSize="md" color="white">{`Selected NFTs: ${selectedNfts.length}`}</Text>
                    </Box>
                    <Button
                        onClick={handleBurnClick}
                        colorScheme="red"
                        size="md"
                        isLoading={burnLoading}
                        isDisabled={selectedNfts.length === 0}
                    >
                        Burn Selected NFTs
                    </Button>
                    <Button
                        onClick={handleSelectAll}
                        colorScheme="blue"
                        size="md"
                        isDisabled={!isConnected}
                    >
                        {selectAll ? "Unselect All" : "Select All"}
                    </Button>
                </HStack>
            </Box>
            <Box className={styles.nftGrid}>
                <Grid templateColumns="repeat(4, 1fr)" gap={4} p={2}>
                    {nfts.map((nft, index) => (
                        <Box
                            key={index}
                            className={`${styles.nftItem} ${selectedNfts.includes(nft.id.tokenId) ? styles.selected : ''}`}
                            onClick={() => handleNftSelect(nft.id.tokenId)}
                            maxW={150}
                        >
                            <Skeleton isLoaded={loadedImages[nft.id.tokenId]} height="150px" width="150px">
                                <Image 
                                    src={nft.media[0].gateway} 
                                    alt={`NFT Image ${nft.id.tokenId}`} 
                                    className={styles.nftImage}
                                    onLoad={() => handleImageLoad(nft.id.tokenId)}
                                    objectFit="cover"
                                    height="150px"
                                    width="150px"
                                />
                            </Skeleton>
                            <Text className={styles.nftTitle}>{nft.title}</Text>
                        </Box>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default NftSelector;