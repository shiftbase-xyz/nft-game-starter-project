require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const { YOUR_ALCHEMY_API_URL, YOUR_PRIVATE_SEPOLIA_ACCOUNT_KEY } = process.env;

module.exports = {
  solidity: '0.8.17',
  networks: {
    sepolia: {
      url: YOUR_ALCHEMY_API_URL || '',
      accounts: YOUR_PRIVATE_SEPOLIA_ACCOUNT_KEY
        ? [YOUR_PRIVATE_SEPOLIA_ACCOUNT_KEY]
        : ['0'.repeat(64)],
    },
  },
};
