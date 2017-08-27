pragma solidity ^0.4.4;

import './TeamCoin.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';

// Ownable, Destructible, Contactable, 
contract TeamCoinSale is Crowdsale {

	string public name = 'TeamCoinSale';
	uint256 STARTBLOCK = 1; // Set this to real values for production
	uint256 ENDBLOCK = 1000; // Set this to real values for production
	uint256 RATE = 25;
	uint256 MAXSUPPLY = 2000000000000000000000000;

  	function TeamCoinSale(uint256 _startBlock, uint256 _endBlock, uint256 _rate, address _wallet) Crowdsale(_startBlock, _endBlock, _rate, _wallet) {

  		startBlock = STARTBLOCK;
  		endBlock = ENDBLOCK;
  		rate = RATE;
  		wallet = msg.sender;
  	
  	}

	function createTokenContract() internal returns (MintableToken) {
    	return new TeamCoin();
  	}

  	function validPurchase() internal constant returns (bool) {
    	uint256 current = block.number;
    	bool withinPeriod = current >= startBlock && current <= endBlock;
    	bool nonZeroPurchase = msg.value != 0;
    	bool nonMaxPurchase = msg.value <= 1000 ether;
    	bool maxSupplyNotReached = token.totalSupply() < MAXSUPPLY;
    	return withinPeriod && nonZeroPurchase && nonMaxPurchase && maxSupplyNotReached;
  }


}