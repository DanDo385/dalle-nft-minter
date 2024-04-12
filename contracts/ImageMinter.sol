// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ImageMinter is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Enhanced event to include more metadata
    event ImageMinted(address indexed minter, uint256 indexed tokenId, string tokenURI, string name, string description);

    constructor() ERC721("ImageMinter", "IMT") {}

    function mintImage(string memory tokenURI, string memory name, string memory description) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // Emitting additional data
        emit ImageMinted(msg.sender, newItemId, tokenURI, name, description);

        return newItemId;
    }
}
