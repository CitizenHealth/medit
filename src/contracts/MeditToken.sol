pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract MeditToken is MintableToken {

  string public constant name = "Medit";
  string public constant symbol = "MDT";
  uint8 public constant decimals = 18;

  uint256 public constant INITIAL_SUPPLY = 1000000 * (10 ** uint256(decimals));

  function MeditToken () public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
    Transfer(0x0, msg.sender, INITIAL_SUPPLY);
  }
  
}
