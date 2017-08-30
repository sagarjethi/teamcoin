pragma solidity ^0.4.16;
import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/token/MintableToken.sol';
import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/ownership/Contactable.sol';
import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/lifecycle/Destructible.sol';
import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/lifecycle/Pausable.sol';



contract TeamCoin is Ownable, Destructible, Contactable, MintableToken {

	string public name = 'TeamCoin';
	string public symbol = 'TMC';
	string public info = 'ipfs:QmPtyYSXbPedgnijREBgHnDs6Jt1ssQk8NMgHuTchoeKZM';
	uint public decimals = 18;
	uint public INITIAL_SUPPLY = 1201000000000000000000000;
	address public owner;
	bool public locked;

  	modifier onlyUnlocked() {

  		if (owner != msg.sender) {
  			require(false == locked);
  		}
	    _;
  	}

	function TeamCoin() {
		locked = true;
  		owner = 0xDFDaCCAE897B008F814225dc67AaCa3aB41250A7;
  		totalSupply = INITIAL_SUPPLY;
  		balances[owner] = INITIAL_SUPPLY;
  		contactInformation = "http://www.teamco.in";
	}

	function unlock() onlyOwner {
	    require(locked);   // to allow only 1 call
	    locked = false;
	}

	function transfer(address _to, uint256 _value) onlyUnlocked returns (bool) {
		balances[msg.sender] = balances[msg.sender].sub(_value);
		balances[_to] = balances[_to].add(_value);
		Transfer(msg.sender, _to, _value);
		return true;
	}

	function transferFrom(address _from, address _to, uint256 _value) onlyUnlocked returns (bool) {
		var _allowance = allowed[_from][msg.sender];
		balances[_to] = balances[_to].add(_value);
		balances[_from] = balances[_from].sub(_value);
		allowed[_from][msg.sender] = _allowance.sub(_value);
		Transfer(_from, _to, _value);
		return true;
	}

}

