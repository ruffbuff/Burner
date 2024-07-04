// src/components/NftSelector.tsx
import React, { useState, useEffect } from 'react';
import { Text, Box, Grid, Image, Button, HStack } from '@chakra-ui/react';
import useBurnNFT from '@/hooks/useBurnNFT';
import { NFT } from '@/types/NFT';

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
            <Box
                alignItems="center"
                justifyContent="center"
                bg="dark.600"
                w="full"
                p={2}
                mt="0.5rem"
                position="sticky"
                top={0}
                left="0"
                right="0"
                bottom="0"
                zIndex={1}
                borderRadius="md"
                border="3px solid transparent"
                sx={{
                    borderImageSlice: 1,
                    animation: "borderFlow 4s linear infinite"
                }}
            >
                <HStack justifyContent="center" alignItems="center" spacing={2}>
                    <Box bg="orange.500" p={2} borderRadius="md">
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
            <Box bg="dark.500" w="full" borderRadius="md" px={2} py={2} mt="1rem" overflowY="auto" h="calc(100vh - 198px)">
                <Grid templateColumns="repeat(3, 1fr)" gap={4} p={2}>
                    {nfts.map((nft, index) => (
                        <Box
                            key={index}
                            borderRadius="md"
                            overflow="hidden"
                            cursor="pointer"
                            onClick={() => handleNftSelect(nft.id.tokenId)}
                            _active={{ transform: "scale(0.98)", border: "6px solid", borderColor: "red.500" }}
                            bg={selectedNfts.includes(nft.id.tokenId) ? "gray.500" : "gray.100"}
                            border={selectedNfts.includes(nft.id.tokenId) ? "6px solid" : "none"}
                            borderColor={selectedNfts.includes(nft.id.tokenId) ? "red" : "none"}
                        >
                            <Image src={nft.media[0].gateway} alt={`NFT Image ${nft.id.tokenId}`} boxSize="100%" objectFit="cover" />
                            <Text p={2}>{nft.title}</Text>
                        </Box>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default NftSelector;
