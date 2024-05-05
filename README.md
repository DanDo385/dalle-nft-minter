# DALLE-NFT-Minter

This project allows users to mint NFTs on the Sepolia testnet by generating images with DALL-E 3, uploading them to IPFS, and then using the metadata to mint the NFT.

## Prerequisites

- Node.js and npm installed
- Solidity compiler (`solc`) installed globally
- MetaMask wallet installed and configured for Sepolia Testnet
- IPFS Desktop installed for handling IPFS uploads

## Setup Instructions

1. **Clone the Repository:**
git clone <repository-url>markdownCopy codeReplace `<repository-url>` with the actual URL of your GitHub repository.

2. **Install Solidity Compiler Globally (if not installed):**
npm install -g solcmarkdownCopy code
3. **Install Dependencies:**
npm installmarkdownCopy code
4. **Compile the Contract:**
npm run compilemarkdownCopy code
5. **Obtain Sepolia Test ETH:**
Obtain Sepolia test ETH from a faucet for deploying contracts and minting NFTs.

6. **Deploy the Contract:**
npm run deploymarkdownCopy codeThis command deploys your contract to the Sepolia testnet.

7. **Run the Development Server:**
npm run devvbnetCopy codeAccess the web application by navigating to `http://localhost:3000` in your web browser.

8. **Log Into MetaMask:**
Ensure MetaMask is connected to the Sepolia testnet and you are logged in.

9. **Generate an Image Using DALL-E 3 API:**
Generate an image with a specified prompt using the DALL-E 3 API.

10. **Upload the Image to IPFS:**
 Use IPFS Desktop to upload the generated image, and copy the IPFS CID that represents your image.

11. **Create Metadata:**
 Create a `metadata.json` file with the following structure:
 ```json
 {
   "name": "Free Willy",
   "description": "Painting of a killer whale",
   "image": "ipfs://<Your-Image-CID>"
 }
 ```
 Replace `<Your-Image-CID>` with the CID from step 10.

12. **Upload the `metadata.json` to IPFS:**
 Upload the metadata file using IPFS Desktop and capture the resulting CID.

13. **Mint the NFT:**
 Navigate to the Mint page via the navbar, enter the IPFS address of the `metadata.json`, and submit. This action will trigger MetaMask to pop up for transaction approval. Upon successful transaction, you will receive an alert that the NFT has been successfully minted.

## Additional Information

- Ensure that each step is followed carefully, especially the inputs for IPFS URLs and transaction approvals.
- Regularly check transaction statuses and MetaMask for any notifications or actions required.

Thank you for using the DALLE-NFT-Minter application!