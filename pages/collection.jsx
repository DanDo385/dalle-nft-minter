import React from 'react';
import DisplayNFTs from '../components/DisplayNFTs';
import contractABI from '../build/ImageMinterABI.json';
import contractAddressData from '../build/DeployedAddress.json';

const CollectionPage = () => {
  const publicKey = '0xcAd4880B26C702F9999Fb80e8C9f66A3C7e4cD99';
  const contractAddress = contractAddressData.address;

  return (
    <div>
      <h1>My NFT Collection</h1>
      <DisplayNFTs
        publicKey={publicKey}
        contractABI={contractABI.abi}
        contractAddress={contractAddress}
      />
    </div>
  );
};

export default CollectionPage;
