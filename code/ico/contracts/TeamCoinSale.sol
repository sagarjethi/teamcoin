pragma solidity ^0.4.16;

import './TeamCoin.sol';
import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath.sol';

/**
 * @title Crowdsale
 * @dev Crowdsale is a base contract for managing a token crowdsale.
 * Crowdsales have a start and end timestamps, where investors can make
 * token purchases and the crowdsale will assign them tokens based
 * on a token per ETH rate. Funds collected are forwarded to a wallet
 * as they arrive.
 */
contract TeamCoinSale {
    using SafeMath for uint256;

    // The token being sold
    MintableToken public token;

    // start and end timestamps where investments are allowed (both inclusive)
    uint256 public startBlock;
    uint256 public endBlock;

    // address where funds are collected
    address public wallet;

    // how many token units a buyer gets per wei
    uint256 public rate;

    // amount of raised money in wei
    uint256 public weiRaised;

    //Constant of max suppliable tokens
    uint256 constant MAXSUPPLY = 2000000000000000000000000;

    /**
     * event for token purchase logging
     * @param purchaser who paid for the tokens
     * @param beneficiary who got the tokens
     * @param value weis paid for purchase
     * @param amount amount of tokens purchased
     */
    event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);


    function TeamCoinSale(uint256 _startBlock, uint256 _endBlock, uint256 _rate) {
        uint256 current = block.number;
        require(_startBlock >= current);
        require(_endBlock >= _startBlock);
        require(_rate > 0);

        token = TeamCoin(0x9eDfa0Ed1A6a14360F28A7faE149816a8617E596);
        startBlock = _startBlock;
        endBlock = _endBlock;
        rate = _rate;
        wallet = msg.sender;
    }


    // fallback function can be used to buy tokens
    function () payable {
        buyTokens(msg.sender);
    }

    // low level token purchase function
    function buyTokens(address beneficiary) payable {
        require(beneficiary != 0x0);
        require(validPurchase());

        uint256 weiAmount = msg.value;

        // calculate token amount to be created
        uint256 tokens = weiAmount.mul(rate);

        // update state
        weiRaised = weiRaised.add(weiAmount);

        token.mint(beneficiary, tokens);
        TokenPurchase(msg.sender, beneficiary, weiAmount, tokens);

        forwardFunds();
    }

    // send ether to the fund collection wallet
    // override to create custom fund forwarding mechanisms
    function forwardFunds() internal {
        wallet.transfer(msg.value);
    }

    function validPurchase() internal constant returns (bool) {
        uint256 current = block.number;
        bool withinPeriod = current >= startBlock && current <= endBlock;
        bool nonZeroPurchase = msg.value != 0;
        bool nonMaxPurchase = msg.value <= 1000 ether;
        bool maxSupplyNotReached = token.totalSupply() < MAXSUPPLY;
        return withinPeriod && nonZeroPurchase && nonMaxPurchase && maxSupplyNotReached;
    }

    function hasEnded() public constant returns (bool) {
        return block.number > endBlock;
    }

}