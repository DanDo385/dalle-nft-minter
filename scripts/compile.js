const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, '..', 'contracts', 'ImageMinter.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'ImageMinter.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contract = output.contracts['ImageMinter.sol']['ImageMinter'];

fs.writeFileSync(path.resolve(__dirname, '..', 'contracts', 'ImageMinterABI.json'), JSON.stringify(contract.abi));

module.exports = contract;
