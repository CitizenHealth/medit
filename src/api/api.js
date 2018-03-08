import { default as Web3 } from 'web3';

import { default as contract } from 'truffle-contract';

import MeditTokenSol from '../build/contracts/MeditToken.json';

var web3 = new Web3(new Web3.providers.HttpProvider("http://devnet:8545"));
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
      return token.totalSupply.call({from: account});
    }).then(function (_total) {
      return _total / Math.pow(10, decimals);
    }).catch(function(e) {
      console.log(e);
      return -1;
    });
  },

  owned : function() {
    return ownedBy(account);
  },

  ownedBy : function(address) {
    var token;
    var decimals;
    return MeditToken.deployed().then(function(instance) {
      token = instance;
      return token.decimals;
    }).then(function(_decimals) {
      decimals = _decimals;
      return token.balanceOf.call(address, {from: account});
    }).then(function(_owned) {
      return _owned / Math.pow(10, decimals);
    }).catch(function(e) {
      console.log(e);
      return -1;
    });   
  },

  mint : function(amount) {
    var token;
    return MeditToken.deployed().then(function(instance) {
      token = instance;
      return token.decimals;
    }).then(function(_decimals) {
      var rawAmount = amount * Math.pow(10, decimals);
      return token.mint(account, rawAmount, {from: account});
    }).catch(function(e) {
      console.log(e);
      return -1;
    });
  },

  transferTo : function(address, amount) {
    var token;
    return MeditToken.deployed().then(function(instance) {
      token = instance;
      return token.decimals;
    }).then(function(_decimals) {
      return token.transfer(address, amount, {from: account});
    }).catch(function(e) {
      console.log(e);
      return -1;
    });
  }
}
