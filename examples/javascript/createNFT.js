import contract from 'truffle-contract';
import web3 from './web3Util';
import PixuraNFT from './abis/PixuraNFT';

const pixuraNft = contract(PixuraNFT);

/**
 * Description [Create new collectible with NFT contract address]
 */
const pixuraCreateToken = async (uri, address) => {
  try {
    const accounts = await web3.eth.getAccounts();
    pixuraNft.setProvider(web3.currentProvider);
    const pixuraDemoInstance = pixuraNft.at(address);
    const txArgs = {
      from: accounts[0],
    };
    const tx = await pixuraDemoInstance.addNewToken.sendTransaction(uri, txArgs);
    await pixuraNft.syncTransaction(tx);
  } catch (err) {
    throw new Error(`Failed to create new token | ${err}`);
  }
};

export default pixuraCreateToken;
