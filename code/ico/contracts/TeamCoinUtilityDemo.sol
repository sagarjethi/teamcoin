pragma solidity ^0.4.16;

import './TeamCoin.sol';

/*	

	This contract is a demo of how TeamCoin will work.
	It allows you to register a username paid in TeamCoin.
	You need to set an allowance to this contract id on the main TeamCoin contract.
	This is just a bare-bones basic utility function to prove how TMC can be used in contracts
	Proof-of-concept

*/

contract TeamCoinUtilityDemo {

    TeamCoin public token; // pointer to the TeamCoin contract, set manually on instantiation
	mapping(string => address) register; // mapping of usernames to ETH addresses

    function TeamCoin(address _token) {

    	token = _token;

    }

    function usernameAvailable(string username) {

    	// No payment needed
    	// check register & return true / false

    }

   	function claimUsername(string username) {

   		// Payment of 1 TMC needed (through allowance)
   		// check if registered
   		// check if valid (alphanum only), max length is 16

    }

    function whois(string username) {
    	// No payment needed
    	// Takes a username string & returns the address that owns it
    	return register[username]

    }

    function releaseUsername(string username) {

    	// Payment needed
    	// check if the username is registered
    	// remove username from register


    }

    function transferUsername(string username, address beneficiary) {

    	// Payment needed
    	// check if registered
    	// set new beneficiary in register for given username

    }

}