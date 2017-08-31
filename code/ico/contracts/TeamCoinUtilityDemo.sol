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

    function usernameAvailable(string username) returns (bool valid) {

        if ("" == register[username]) {
            return true;
        } else {
            return false;
        }

    }

   	function claimUsername(string username) {

        if ("" == register[username]) {
            return true;
        } else {
            return false;
        }

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

        if ("" == register[username]) {
            return true;
        } else {
            return false;
        }

    	// Payment needed
    	// check if registered
    	// set new beneficiary in register for given username

    }

    function isAlphaNum(byte char) internal returns (bool valid) {

        if(char >= 65 && char <= 90) {
            return true;
        }
        if(char >= 48 && char <= 57) {
            return true;
        }

        return false;

  }

}