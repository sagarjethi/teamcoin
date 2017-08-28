pragma solidity ^0.4.16;
import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/token/MintableToken.sol';
import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/ownership/Contactable.sol';
import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/lifecycle/Destructible.sol';
import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/lifecycle/Pausable.sol';



contract TeamCoin is Ownable, Destructible, Contactable, MintableToken {

	string public name = 'TeamCoin';
	string public symbol = 'TMC';
	string public terms = 'ipfs:QmPtyYSXbPedgnijREBgHnDs6Jt1ssQk8NMgHuTchoeKZM';
	string public terms_md5 = '1aefd0716c03cfe5803598e6d27d918b';
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
		
		// Locking the contract disables the transfer functions.
		locked = true;

		// Set according to this formula for live: last_block_number + ((future_time - time_now) / block_time)
  		totalSupply = INITIAL_SUPPLY;
  		balances[msg.sender] = INITIAL_SUPPLY; // set to wallet
  		owner = msg.sender;
  		contactInformation = "web: http://www.teamco.in email: francis@dierick.co twitter: @macbookjockey";
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

		// Check is not needed because sub(_allowance, _value) will already throw if this condition is not met
		// require (_value <= _allowance);

		balances[_to] = balances[_to].add(_value);
		balances[_from] = balances[_from].sub(_value);
		allowed[_from][msg.sender] = _allowance.sub(_value);
		Transfer(_from, _to, _value);
		return true;
	}

}

