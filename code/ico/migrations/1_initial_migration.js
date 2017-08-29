var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  
  deployer.deploy(Migrations, {gas: 1000000, gasPrice: 100000000000});


};
