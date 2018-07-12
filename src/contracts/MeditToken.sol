pragma solidity ^0.4.18;

import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';
import 'openzeppelin-solidity/contracts/token/ERC827/ERC827Token.sol';

contract MeditToken is MintableToken, ERC827Token {

  string public constant name = "MeditToken";
  string public constant symbol = "MDT";
  uint8 public constant decimals = 18;

  uint256 public constant INITIAL_SUPPLY = (10 ** 10) * (10 ** uint256(decimals));

  constructor () public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
    emit Transfer(0x0, msg.sender, INITIAL_SUPPLY);
  }
  
}
