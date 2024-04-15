// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ImageMinter is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => string) public tokenNames;
    mapping(uint256 => string) public tokenDescriptions;

    event ImageMinted(address indexed minter, uint256 indexed tokenId, string _tokenURI, string name, string description);

    constructor() ERC721("ImageMinter", "IMT") {}

    function mintImage(string memory imageURI, string memory name, string memory description) public returns (uint256) {
        require(bytes(imageURI).length > 0, "Image URI is required");
        require(bytes(name).length > 0, "Name is required");
        require(bytes(description).length > 0, "Description is required");
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, imageURI);
        tokenNames[newItemId] = name;
        tokenDescriptions[newItemId] = description;

        emit ImageMinted(msg.sender, newItemId, imageURI, name, description);
        return newItemId;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    // Helper function to compare strings by bytes
    function compareStringsByBytes(string memory s1, string memory s2) private pure returns(bool){
        return keccak256(bytes(s1)) == keccak256(bytes(s2));
    }

    // Helper function to get substring
    function substring(string memory str, uint startIndex) private pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(strBytes.length - startIndex);
        for(uint i = startIndex; i < strBytes.length; i++) {
            result[i-startIndex] = strBytes[i];
        }
        return string(result);
    }
}
