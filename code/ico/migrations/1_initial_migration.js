var Migrations = artifacts.require("./Migrations.sol");

var TeamCoin = artifacts.require("./TeamCoin.sol");
var TeamCoinSale = artifacts.require("./TeamCoinSale.sol");

module.exports = function(deployer) {
  
  deployer.deploy(Migrations, {gas: 1000000, gasPrice: 100000000000});


};
