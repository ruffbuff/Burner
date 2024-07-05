// src/components/AlchemyLink.tsx
import React from 'react';
import { Box, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const AlchemyLink: React.FC = () => {
    return (
        <Box
            bg="blue.500"
            color="white"
            p={4}
            w={'100%'}
            borderRadius="md"
            boxShadow="md"
            textAlign="center"
            position="relative"
            overflow="hidden"
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)',
                animation: 'shine 3s infinite',
            }}
        >
            <Text fontSize="lg" fontWeight="bold" mb={2}>
                Need an Alchemy API Key?
            </Text>
            <Link
                href="https://docs.alchemy.com/docs/alchemy-quickstart-guide"
                isExternal
                color="white"
                textDecoration="underline"
                _hover={{ color: 'blue.100' }}
            >
                Get your API Key from Alchemy <ExternalLinkIcon mx="2px" />
            </Link>
        </Box>
    );
};

export default AlchemyLink;