// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ImageMinter is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event ImageMinted(address indexed minter, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("ImageMinter", "IMT") {}

    function mintImage(string memory tokenURI) public returns (uint256) {
        require(bytes(tokenURI).length > 0, "Metadata URI is required");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        emit ImageMinted(msg.sender, newItemId, tokenURI);
        return newItemId;
    }
}
