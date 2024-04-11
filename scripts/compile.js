//scripts/compile.js
const path = require('path');
const fs = require('fs');
const solc = require('solc');

function findImports(importPath) {
  if (importPath.startsWith('@openzeppelin')) {
    try {
      const filePath = path.join(__dirname, '../node_modules', importPath);
      const content = fs.readFileSync(filePath, 'utf8');
      return { contents: content };
    } catch (error) {
      console.error('Error in findImports:', error);
      return { error: 'File not found' };
    }
  } else {
    return { error: 'File not found' };
  }
}

const contractPath = path.resolve(__dirname, '../contracts', 'ImageMinter.sol');
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

try {
  const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

  if (output.errors) {
    for (const error of output.errors) {
      console.error(error.formattedMessage);
    }
    process.exit(1); // Exit with an error code if there were errors
  }

  const compiledContract = output.contracts['ImageMinter.sol']['ImageMinter'];
  const buildPath = path.resolve(__dirname, '../build');

  if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
  }

  fs.writeFileSync(path.join(buildPath, 'ImageMinterABI.json'), JSON.stringify(compiledContract.abi));
  fs.writeFileSync(path.join(buildPath, 'ImageMinterBytecode.json'), compiledContract.evm.bytecode.object);

  console.log('Contract compiled successfully');
} catch (error) {
  console.error('Error compiling contract:', error);
}
