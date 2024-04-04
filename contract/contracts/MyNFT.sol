// SPDX-License-Identifier: MIT
pragma solidity <=0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {

    event Minted(address indexed owner, uint256 indexed tokenId, string uri);

    event Transferred(address indexed from, address indexed to, uint256 indexed tokenId);

    event Burned(address indexed burner, uint256 indexed tokenId);

    constructor(
        address initialOwner
    ) ERC721("MyNFT", "NFT") Ownable(initialOwner) {}

    function safeMint(
        address to,
        uint256 tokenId,
        string memory uri
    ) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

         emit Minted(to, tokenId, uri);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function burn(uint256 _tokenId) public override{
        require(ownerOf(_tokenId) == msg.sender, "You are not the owner");

        _burn(_tokenId);

        emit Burned(msg.sender, _tokenId);
    }

    function transferNFT(address _to, uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender, "You are not the owner nft");

        _transfer(msg.sender, _to, _tokenId);

        emit Transferred(msg.sender, _to, _tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function transferOwnership(address _to) public override onlyOwner {

        _transferOwnership(_to);
    }
}
