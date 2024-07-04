// src/hooks/useBurnNFT.ts
import { useState } from 'react';
import Web3 from 'web3';
import { burnerAddress, burnerAbi } from "@/app/contracts";

const useBurnNFT = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | string | null>(null);

    const burnNFT = async (nftAddress: string, tokenIds: string[]) => {
        try {
            setIsLoading(true);
            setError(null);

            if (!window.ethereum || !window.ethereum.request) {
                throw new Error("Ethereum object or 'request' method doesn't exist in your browser.");
            }

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(burnerAbi, burnerAddress);

            const isApproved = await checkApproval(web3, nftAddress, accounts[0]);
            if (!isApproved) {
                await approveAll(web3, nftAddress, accounts[0]);
            }

            console.log("Burning NFTs:", tokenIds);
            const transactionResponse = await contract.methods.sendToDead(nftAddress, tokenIds).send({ from: accounts[0] });

            setIsLoading(false);
            return transactionResponse;
        } catch (err) {
            setError(err instanceof Error ? err : String(err));
            setIsLoading(false);
            throw err;
        }
    };

    const checkApproval = async (web3: Web3, nftAddress: string, ownerAddress: string) => {
        try {
            const nftContract = new web3.eth.Contract(erc721Abi, nftAddress); // Здесь используем правильный ABI для ERC721
            return await nftContract.methods.isApprovedForAll(ownerAddress, burnerAddress).call();
        } catch (err) {
            throw new Error(`Failed to check approval: ${err}`);
        }
    };

    const approveAll = async (web3: Web3, nftAddress: string, ownerAddress: string) => {
        try {
            const nftContract = new web3.eth.Contract(erc721Abi, nftAddress); // Здесь используем правильный ABI для ERC721
            const approvalResponse = await nftContract.methods.setApprovalForAll(burnerAddress, true).send({ from: ownerAddress });
            return approvalResponse;
        } catch (err) {
            throw new Error(`Failed to approve all NFTs: ${err}`);
        }
    };

    // ABI для ERC721 контракта
    const erc721Abi = [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_operator",
                    "type": "address"
                },
                {
                    "name": "_approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    return {
        isLoading,
        error,
        burnNFT
    };
};

export default useBurnNFT;
