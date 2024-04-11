// scripts/deploy.js
require('dotenv').config(); // Ensure environment variables are loaded

const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Assuming PRIVATE_KEY and INFURA_PROJECT_ID are set in your .env file
const privateKey = process.env.PRIVATE_KEY;
if (!privateKey || !privateKey.startsWith('0x')) {
    console.error('Invalid or missing PRIVATE_KEY environment variable.');
    process.exit(1);
}

const infuraProjectId = process.env.INFURA_PROJECT_ID;
// Adjust 'sepolia' to the network you intend to use or have configured in Infura
const provider = new ethers.providers.InfuraProvider('sepolia', infuraProjectId);
const wallet = new ethers.Wallet(privateKey, provider);

// Load the contract ABI and bytecode from separate files
const abiPath = path.resolve(__dirname, '..', 'build', 'ImageMinterABI.json');
const bytecodePath = path.resolve(__dirname, '..', 'build', 'ImageMinterBytecode.json');

const abi = require(abiPath);
const bytecode = fs.readFileSync(bytecodePath, 'utf8');

async function deploy() {
    try {
        const factory = new ethers.ContractFactory(abi, bytecode, wallet);
        console.log('Deploying contract...');
        const deployedContract = await factory.deploy();
        await deployedContract.deployed();
        console.log('Contract deployed to:', deployedContract.address);

        // Save the contract address for future use
        fs.writeFileSync(
            path.resolve(__dirname, '..', 'build', 'DeployedAddress.json'), 
            JSON.stringify({ address: deployedContract.address }, null, 2)
        );
        console.log('Deployment successful. Contract address saved to DeployedAddress.json.');
    } catch (error) {
        console.error('Error deploying contract:', error);
        process.exit(1);
    }
}

deploy();
