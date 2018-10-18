# Pixura’s Graph API:

The pixura graph api enables querying NFTs from indexed smart contracts.

The best way to familiarize yourself with the API, visit https://ropsten-api.pixura.io/graphiql which is an interactive querying tool. You can read up on the available types and functions by clicking the `Docs` tab in the top right corner.




Another way to familiarize yourself with the types will be to run some queries. The interface has provides auto-complete using ctrl+space.


<gif using auto-complete to write a query>

Here is an example query:

{
  allErc721Metadata {
    nodes {
      tokenId
      contractAddress
      metadata
    }
  }
}

It will return an array of Erc721Metadata with only the properties specified: tokenId, contractAddress, and metadata.

Give this a try by pasting the above query into graphiql.



Indexing a smart contract

Once you have a smart contract deployed, you will want to tell our indexer to begin indexing the contract. The indexer watches for solidity events and updates the NFT’s state.

By sending a  POST request to https://ropsten-api.pixura.io/contract, the indexer will begin indexing the contract. An example of the JSON body required is below: 

{
	"address": "0xa42e14b40bb22bc3daaf8ecad9d73bdf44056959",
	"startBlock": 2950646,
	"endBlock": 3950646,
	"smartRestart": true,
	"contractType": "ERC721ContractOld",
	"image": "https://cdn.theatlantic.com/assets/media/img/mt/2017/06/shutterstock_319985324/lead_720_405.jpg?mod=1533691890"
}

address: (required) the address of the smart contract (hex string)
startBlock: (required) the starting block to index from (unsigned integer)
endBlock: (optional) block to stop indexing (unsigned integer
smartRestart: (required) tells the indexer to index the contract at the latest block seen for this 
Contract. (bool)
contractType: (required) type of smart contract being indexed 
                       (Available types:  ERC721Contract, ERC721ContractOld,       
                                                    ERC721MarketContract)
image: (optional) an image to associate with the smart contract

The expected response body in the event of success is the string: “Success”
