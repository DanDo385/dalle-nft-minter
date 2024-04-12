// pages/collection.jsx
import DisplayNFTs from '../components/DisplayNFTs';
import contractABI from '../build/ImageMinterABI.json';
import contractAddressData from '../build/DeployedAddress.json';

const CollectionPage = () => {
  return (
    <div>
      <h1 style={{ color: 'white', textAlign: 'center' }}>My NFT Collection</h1>
      <DisplayNFTs
        publicKey="0xcAd4880B26C702F9999Fb80e8C9f66A3C7e4cD99"
        contractABI={contractABI}
        contractAddress={contractAddressData.address}
      />
    </div>
  );
};

export default CollectionPage;