/*
      
      INTERACTIVE tests
      More verbose than unit tests
      Tweak to simulate real ICO lifecycle
      Tests upper limit of 20M tokens
      TODO: merge into unit tests?
*/


var TeamCoinSale = artifacts.require("./TeamCoinSale.sol");
var TeamCoin = artifacts.require("./TeamCoin.sol");

module.exports = function(callback) {

	console.log("BLOCK NUMBER: " + web3.eth.blockNumber);

	var totalSupply;
	var decimals = 1000000000000000000;
	// Make sure we're running this from the beginning ...
	if (web3.eth.blockNumber > 50) {
		exit("Please restart testrpc before running this.");
	}

  	TeamCoin.deployed().then(function(instance) {


      	// CHECK TRANSFERS BEFORE UNLOCK ...

      	instance.balanceOf(web3.eth.accounts[0]).then(function(result){
      			console.log("INITIAL OWNER BALANCE: ", result);
      	}).catch(function(error){
      			console.log("Can't fetch balance.");
      	});

      	instance.transfer(web3.eth.accounts[0], 1, {from: web3.eth.accounts[1]}).then(function(result){
      			console.log("ERROR: Transfer succeeded. Unexpected.");
      	}).catch(function(error){
      			console.log("Transfer failed as expected.");
      	});

      	instance.transfer(web3.eth.accounts[1], 1, {from: web3.eth.accounts[0]}).then(function(result){
      			console.log("Transfer succeeded as expected.");
      	}).catch(function(error){

      			console.log("ERROR: Transfer failed. Unexpected.");
      	});

      	instance.balanceOf(web3.eth.accounts[0]).then(function(result){
      			console.log("OWNER BALANCE AFTER SMALL TRANSFER: ", result);
      	}).catch(function(error){
      			console.log("Can't fetch balance.");
      	});

      	instance.balanceOf(web3.eth.accounts[1]).then(function(result){
      			console.log("RECEIVER BALANCE AFTER SMALL TRANSFER: ", result);
      	}).catch(function(error){
      			console.log("Can't fetch balance.");
      	});

      	// Transfer pre-sale tokens
      	instance.transfer(web3.eth.accounts[2], 540 * 1000000000000000000, {from: web3.eth.accounts[0]}).then(function(result){
      			console.log("Transfer succeeded as expected.");
      	}).catch(function(error){
      			console.log(error);
      			console.log("ERROR: Transfer failed. Unexpected.");
      	});

      	instance.balanceOf(web3.eth.accounts[0]).then(function(result){
      			console.log("OWNER BALANCE AFTER FIRST PRE-SALE TRANSFER: ", result);
      	}).catch(function(error){
      			console.log("Can't fetch balance.");
      	});

      	instance.balanceOf(web3.eth.accounts[2]).then(function(result){
      			console.log("RECEIVER BALANCE AFTER FIRST PRE-SALE TRANSFER: ", result);
      	}).catch(function(error){
      			console.log("Can't fetch balance.");
      	});


      	instance.transfer(web3.eth.accounts[3], 360 * 1000000000000000000, {from: web3.eth.accounts[0]}).then(function(result){
      			console.log("Transfer succeeded as expected.");
      	}).catch(function(error){
      			console.log(error);
      			console.log("ERROR: Transfer failed. Unexpected.");
      	});

      	instance.balanceOf(web3.eth.accounts[0]).then(function(result){
      			console.log("OWNER BALANCE AFTER SECOND PRE-SALE TRANSFER: ", result);
      	}).catch(function(error){
      			console.log("Can't fetch balance.");
      	});

      	instance.balanceOf(web3.eth.accounts[3]).then(function(result){
      			console.log("RECEIVER BALANCE AFTER SECOND PRE-SALE TRANSFER: ", result);
      	}).catch(function(error){
      			console.log("Can't fetch balance.");
      	});


      	instance.transfer(web3.eth.accounts[4], 100 * 1000000000000000000, {from: web3.eth.accounts[0]}).then(function(result){
      			console.log("Transfer succeeded as expected.");
      	}).catch(function(error){
      			console.log(error);
      			console.log("ERROR: Transfer failed. Unexpected.");
      	});

      	instance.balanceOf(web3.eth.accounts[0]).then(function(result){
      			console.log("OWNER BALANCE AFTER THIRD PRE-SALE TRANSFER: ", result);
      	}).catch(function(error){
      			console.log("Can't fetch balance.");
      	});

      	instance.balanceOf(web3.eth.accounts[4]).then(function(result){
      			console.log("RECEIVER BALANCE AFTER THIRD PRE-SALE TRANSFER: ", result);
      	}).catch(function(error){
      			console.log("Can't fetch balance.");
      	});




	});

  	// Make sure purchasing tokens fails before begin block
	TeamCoinSale.deployed().then(function(instance) {

		instance.buyTokens(web3.eth.accounts[1], {value: 1}).then(function() {
			console.log("Purchase OK");
		}).catch(function(){
			console.log("Purchase failed as expected.");
		});
		
	});


  	// Fast-forward block & start ICO
	TeamCoin.deployed().then(function(instance) {

		var begin = web3.eth.blockNumber;

      	for (i = begin; i < 100; i++) {

      		instance.transfer(web3.eth.accounts[1], 1).then(function(result){
      			console.log("Transfer done");
      		});

      	}

	});

	TeamCoinSale.deployed().then(function(instance) {



		instance.buyTokens(web3.eth.accounts[1], {value: 1}).then(function() {
			console.log("Purchase OK. Expected");
		}).catch(function(){
			console.log("Purchase failed.");
		});

		let initial = 12001000000000000000000000;
		let max = 12002000000000000000000000;




		instance.buyTokens(web3.eth.accounts[2], {value: 10000000000000}).then(function() {
			console.log("Purchase OK. Expected");
		}).catch(function(){
			console.log("Purchase failed.");
		});
		
	});

}

