# Pixura’s Graph API:

The pixura graph api enables querying NFTs from indexed smart contracts.

The best way to familiarize yourself with the API is to visit https://ropsten-api.pixura.io/graphiql which is an interactive querying tool. You can read up on the available types and functions by clicking the `Docs` tab in the top right corner.

![Accessing the GraphiQL Docs](https://github.com/Pixura/pixura-docs/blob/master/assets/graphiql_demo.gif?raw=true)


Another way to familiarize yourself with the types will be to run some queries. The interface has provides auto-complete using ctrl+space. Below is an example of using autocomplete to guide in building a query:


![Building a query with autocomplete](https://github.com/Pixura/pixura-docs/blob/master/assets/graphiql_autocomplete.gif?raw=true)

Here is an example query:

```graphql
{
  allErc721Metadata {
    nodes {
      tokenId
      contractAddress
      metadata
    }
  }
}
```

It will return an array of Erc721Metadata with only the properties specified: tokenId, contractAddress, and metadata.

Give this a try by pasting the above query into graphiql.



# Indexing a smart contract

Once you have a smart contract deployed, you will want to tell our indexer to begin indexing the contract. The indexer watches for solidity events and updates the NFT’s state.

By sending a  POST request to https://ropsten-api.pixura.io/contract, the indexer will begin indexing the contract. An example of the JSON body required is below: 

```JSON
{
	"address": "0xa42e14b40bb22bc3daaf8ecad9d73bdf44056959",
	"startBlock": 2950646,
	"endBlock": 3950646,
	"smartRestart": true,
	"contractType": "ERC721ContractOld",
	"image": "https://cdn.theatlantic.com/assets/media/img/mt/2017/06/shutterstock_319985324/lead_720_405.jpg?mod=1533691890"
}
```

Here is the JSON schema for the contract indexer config:

```JSON
{
    "title": "Contract Indexer Config",
    "type": "object",
    "properties": {
        "address": {
            "type": "string",
            "description": "A hexadecimal string of the contract's address.",
	    "required": true
        },
        "startBlock": {
            "type": "integer",
            "description": "The block number to start indexing from.",
	    "required": true
        },
	"endBlock": {
            "type": "integer",
            "description": "The block number to end, if missing index as blockchain grows.",
	    "required": false
        },
	"smartRestart": {
            "type": "boolean",
            "description": "Indicate to the indexer to index the contract at the latest block seen for this contract.",
	    "required": true
        },
	"contractType": {
            "type": "string",
            "description": "The type of smart contract being indexed. Available types: ERC721Contract, ERC721ContractOld, and ERC721MarketContract",
	    "required": true
        },
        "image": {
            "type": "string",
            "description": "A URI pointing to a resource with mime type image/* representing the contract.",
	    "required": true
        }
    }
}
```


The expected response body in the event of success is the string: “Success”
