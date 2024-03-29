import { default as Web3 } from 'web3';

import { default as contract } from 'truffle-contract';

import MeditTokenSol from '../build/contracts/MeditToken.json';
var HDWalletProvider = require("truffle-hdwallet-provider");
var config = require('./config.json');

var provider = process.env.PROVIDER;
console.log("Provider is: " + provider);
var web3;
if (typeof provider == "undefined" || provider == "DOCKER") {
  web3 = new Web3(new Web3.providers.HttpProvider("http://devnet:8545"));
} else if (provider == "INFURA") {
  web3 = new Web3(new HDWalletProvider(config.mnemonic, "https://mainnet.infura.io/" + config.infurakey, config.account));
}
console.log(web3);

var MeditToken = contract(MeditTokenSol);
MeditToken.setProvider(web3.currentProvider);
fixTruffleContractCompatibilityIssue(MeditToken);

// Workaround for a compatibility issue between web3@1.0.0-beta.29 and truffle-contract@3.0.3
// https://github.com/trufflesuite/truffle-contract/issues/57#issuecomment-331300494
function fixTruffleContractCompatibilityIssue(contract) {
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function() {
            return contract.currentProvider.send.apply(
                contract.currentProvider, arguments
            );
        };
    }
    return contract;
}

var accounts;
var account;


var setAccounts = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      console.log("There was an error fetching your accounts." + err);
      return;
    }
    
    if (accs.length == 0) {
      console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }
    
    accounts = accs;
    account = accounts[0]; 
  });
}

module.exports = {

  init : function() { 
    setAccounts();
  },

  totalMinted : function() {
    var token;
    var decimals;
    return MeditToken.deployed().then(function(instance) {
      token = instance;
      return token.decimals();
    }).then(function (_decimals) {
      decimals = _decimals;
      return token.totalSupply.
        call({from: account});
    }).then(function (_total) {
      return _total / Math.pow(10, decimals);
    }).catch(function(e) {
      console.log(e);
      return -1;
    });
  },

  owned : function() {
    var token;
    var decimals;
    return MeditToken.deployed().then(function(instance) {
      token = instance;
      return token.decimals();
    }).then(function(_decimals) {
      decimals = _decimals;
      return token.balanceOf.call(account, {from: account});
    }).then(function(_owned) {
      return _owned / Math.pow(10, decimals);
    }).catch(function(e) {
      console.log(e);
      return -1;
    });   
  },

  ownedBy : function(address) {
    var token;
    var decimals;
    return MeditToken.deployed().then(function(instance) {
      token = instance;
      return token.decimals();
    }).then(function(_decimals) {
      decimals = _decimals;
      return token.balanceOf.call(address, {from: account});
    }).then(function(_owned) {
      return _owned / Math.pow(10, decimals);
    }).catch(function(e) {
      console.log(e);
      return -1;
    });   
  }
}

