// src/app/not-found.tsx
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            textAlign="center"
        >
            <Heading as="h2">404 - Not Found</Heading>
            <Text>Could not find the requested resource.</Text>
            <Link href="/" passHref>
                <Button
                    style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        borderRadius: '0.5rem',
                        background: '#fff',
                        color: 'black',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Return Home
                </Button>
            </Link>
        </Box>
    );
}