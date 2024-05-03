// components/MintNFT.jsx

const MintNFT = ({ signer, ipfsUrl }) => {
    useEffect(() => {
        if (!ipfsUrl) {
            alert('No metadata URL found. Please save metadata first.');
            return;
        }
        // Now directly use ipfsUrl since it should already contain the correct metadata URL
    }, [ipfsUrl]);

    const handleMintNFT = async () => {
        if (!ipfsUrl) {
            alert('No metadata URL found. Please save metadata first.');
            return;
        }

        try {
            const contractAddress = deployedAddress.address;
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const transaction = await contract.mintImage(ipfsUrl);
            await transaction.wait();
            alert('NFT Minted Successfully');
        } catch (error) {
            console.error('Error minting NFT:', error);
            alert('Failed to mint NFT');
        }
    };

    return <Button onClick={handleMintNFT}>Mint NFT</Button>;
};
