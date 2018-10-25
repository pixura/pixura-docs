import axios from 'axios';

import web3 from './web3Util';
import PixuraNFT from './abis/PixuraNFT';

const PIXURA_API_URL = 'https://alpha-token-platform.pixura.io';

/**
 * Description [ Create new ERC721 Smart Contract]
 * @param {string} name - The name of the NFT contract.
 * @param {string} symbol - The symbol for the NFT tokens.
 * @return { Object } Eth Tx Receipt
 */
export const createNewNFTContract = async (name, symbol) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const nftContract = new web3.eth.Contract(PixuraNFT.abi);
    const deployArgs = {
      data: PixuraNFT.bytecode,
      arguments: [name, symbol],
    };
    const encodedABI = nftContract.deploy(deployArgs).encodeABI();
    const txDetails = { data: encodedABI, from: accounts[0] };
    return web3.eth.sendTransaction(txDetails);
  } catch (err) {
    throw new Error(`Failed to create new NFT contract ${name} ${symbol} | ${err}`);
  }
};

/**
 * Description [ Register an ERC721 Smart Contract to be indexed]
 * @param {number} blockNum - The block number to index from.
 * @param {string} address - The address of the NFT contract.
 * @return { undefined }
 */
export const registerContractToIndex = async (blockNum, address) => {
  const CONTRACT_ENDPOINT = `${PIXURA_API_URL}/register-contract`;
  const registration = {
    address,
    startBlock: blockNum,
    smartRestart: true,
    contractType: 'ERC721Contract',
  };
  try {
    await axios.post(CONTRACT_ENDPOINT, registration);
  } catch (err) {
    throw new Error(`Failed to register contract ${address} | ${err}`);
  }
};

/**
 * Description [ Create and register a new ERC721 Smart Contract for indexing.]
 * @param {string} name - The name of the NFT contract.
 * @param {string} symbol - The symbol for the NFT tokens.
 * @return { undefined }
 */
export const createAndRegisterNFTContract = async (name, symbol) => {
  try {
    const txReceipt = await createNewNFTContract(name, symbol);
    const { address, blockNumber } = txReceipt;
    await registerContractToIndex(blockNumber, address);
  } catch (err) {
    throw new Error(err);
  }
};
