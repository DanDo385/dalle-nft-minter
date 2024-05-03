// components/MintNFT.jsx
const MintNFT = ({ signer, ipfsUrl }) => {
    useEffect(() => {
        if (!ipfsUrl) {
            console.log("IPFS URL is empty on mount.");
        } else {
            console.log("IPFS URL on mount:", ipfsUrl);
        }
    }, [ipfsUrl]);

    const handleMintNFT = async () => {
        if (!ipfsUrl) {
            alert('No metadata URL found. Please save metadata first.');
            return;
        }
        // Code to mint NFT
    };

    return (
        <Button onClick={handleMintNFT}>Mint NFT</Button>
    );
};
