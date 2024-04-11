const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Adjust the require path for the compiled contract
const contract = require('../compile');

const privateKey = 'PRIVATE_KEY'; // Use environment variables for safety
const provider = new ethers.providers.InfuraProvider('sepolia', 'INFURA_PROJECT_ID');
const wallet = new ethers.Wallet(privateKey, provider);

(async () => {
    const factory = new ethers.ContractFactory(contract.abi, contract.evm.bytecode.object, wallet);
    console.log('Deploying contract...');
    const deployedContract = await factory.deploy();
    await deployedContract.deployed();
    console.log('Contract deployed to:', deployedContract.address);

    // Adjust the path to save the contract address
    fs.writeFileSync(path.resolve(__dirname, '..', 'contracts', 'DeployedAddress.json'), JSON.stringify({ address: deployedContract.address }));
})();
