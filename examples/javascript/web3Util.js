import Web3 from './node_modules/web3'; // Must specfiy node_modules to avoid importing itself

let web3; // eslint-disable-line
// If Web3 is not present set the value to false so we can prompt the user
if (
  typeof window !== 'undefined' // Check we're on the client-side
  && (typeof window.web3 === 'undefined' || typeof window.web3.currentProvider === 'undefined')
) {
  web3 = false;
}

// Instantiate new web3 local instance
if (
  typeof window !== 'undefined' // Check we're on the client-side
  && typeof window.web3 !== 'undefined'
  && typeof window.web3.currentProvider !== 'undefined'
) {
  web3 = new Web3(window.web3.currentProvider);
}

// Get current provider
export function getCurrentProvider() {
  return web3.currentProvider;
}

// Export web3 object instance
export default web3;
