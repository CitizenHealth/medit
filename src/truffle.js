var HDWalletProvider = require("truffle-hdwallet-provider");
var config = require('./config.json');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: 'devnet',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 4612388
    }, 
    ropsten: {
      provider: new HDWalletProvider(config.mnemonic, "https://ropsten.infura.io/" + config.infurakey, config.account),
      network_id: 3
    },
    live : {
      provider: new HDWalletProvider(config.mnemonic, "https://mainnet.infura.io/" + config.infurakey, config.account),
      network_id: 1,
      gas: 2750000, // Gas limit used for deploys
      gasPrice: 15000000000, // 15 gwei
    }
  }
};
