var TeamCoinSale = artifacts.require("./TeamCoinSale.sol");
var TeamCoin = artifacts.require("./TeamCoin.sol");



contract('TeamCoinSale', function(accounts) {

    it("Name should be TeamCoinSale.", function() {
      return TeamCoinSale.deployed().then(function(instance) {

        return instance.name.call();
      
      }).then(function(result) {
        
        assert.equal(result, "TeamCoinSale", "The token's name should be TeamCoinSale.");

      }).catch(function(error) {


        assert.isOk(false, "Error in TeamCoinSale name.");

      });
    });

    it("Startblock should be OK.", function() {
      return TeamCoinSale.deployed().then(function(instance) {

        return instance.startBlock.call();
      
      }).then(function(result) {
        assert.equal(result, 1, "The token's startBlock should be 100.");

      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoinSale startBlock.");

      });
    });

    it("Endblock should be OK.", function() {
      return TeamCoinSale.deployed().then(function(instance) {

        return instance.endBlock.call();
      
      }).then(function(result) {

        assert.equal(result, 1000, "The token's endBlock should be 1000.");

      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoinSale endBlock.");

      });
    });

    it("Rate should be OK.", function() {
      return TeamCoinSale.deployed().then(function(instance) {

        return instance.rate.call();
      
      }).then(function(result) {

        assert.equal(result, 25, "The token's rate should be 1.");

      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoinSale rate.");

      });
    });

    it("Wallet should be OK.", function() {
      return TeamCoinSale.deployed().then(function(instance) {

        return instance.wallet.call();
      
      }).then(function(result) {

        assert.equal(result, accounts[0], "The wallet should be same as creator");

      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoinSale name.");

      });
    });

    it("Coin purchase should work when calling buyTokens.", function() {
      return TeamCoinSale.deployed().then(function(instance) {

      

        return instance.buyTokens(accounts[1], {value: 1}); // In Wei
      
      }).then(function(result) {

        assert.isOk(result, "OK.");

      }).catch(function(error) {
        assert.isOk(false, "Error in TeamCoinSale name.");

      });
    });

    it("TeamCoinSale balance in WEI.", function() {
      return TeamCoinSale.deployed().then(function(instance) {


        return instance.weiRaised.call(); // Is this ETH?
      
      }).then(function(result) {

        assert.equal(1, result, "Balance should be 25 after purchase");

        assert.isOk(result, "OK.");

      }).catch(function(error) {
        assert.isOk(false, "Error in TeamCoinSale name.");

      });
    });




    it("TeamCoin totalSupply after purchase.", function() {

      return TeamCoinSale.deployed().then(function(instance) {

        return instance.token.call(); // Is this ETH?
      
      }).then(function(result) {


        var tc = TeamCoin.at(result);



        return tc.totalSupply.call().then(function(result) {

          assert.equal(result, 1201000000000000000000025, "25 tokens should have been added");


        }).catch(function(error) {


        assert.isOk(false, "Error in TeamCoin totalSupply.");

        });

      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoin totalSupply.");

      });
    });

    it("TeamCoin sender balance after purchase.", function() {

      return TeamCoinSale.deployed().then(function(instance) {

        return instance.token.call(); // Is this ETH?
      
      }).then(function(result) {

        var tc = TeamCoin.at(result);

        return tc.balanceOf.call(accounts[1]).then(function(result) {

          assert.equal(25, result, "Balance should be 25 after purchase");

        }).catch(function(error) {

          assert.isOk(false, "Error in TeamCoin totalSupply.");

        });

      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoin totalSupply.");

      });
    });


    // Coin purchase should work when calling raw contract !!!

    it("Coin purchase should work when calling raw contract.", function() {

      return TeamCoinSale.deployed().then(function(instance) {


        return web3.eth.sendTransaction({from: accounts[1], to: instance.address, value: 1});

      }).then(function(result) {

          assert.isOk(true, "Coin purchase to raw contract worked. Expected");


      }).catch(function(error) {


        console.log(error);


      });

    });

    it("TeamCoin sender balance after purchase.", function() {

      return TeamCoinSale.deployed().then(function(instance) {

        return instance.token.call(); // Is this ETH?
      
      }).then(function(result) {

        var tc = TeamCoin.at(result);

        return tc.balanceOf.call(accounts[1]).then(function(result) {

          assert.equal(50, result, "Balance should be 50 after purchase");

        }).catch(function(error) {

          assert.isOk(false, "Error in TeamCoin totalSupply.");

        });

      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoin totalSupply.");

      });
    });


    it("TeamCoin totalSupply after purchase.", function() {

      return TeamCoinSale.deployed().then(function(instance) {

        return instance.token.call(); // Is this ETH?
      
      }).then(function(result) {


        var tc = TeamCoin.at(result);



        return tc.totalSupply.call().then(function(result) {

          assert.equal(result, 1201000000000000000000050, "25 tokens should have been added");


        }).catch(function(error) {


        assert.isOk(false, "Error in TeamCoin totalSupply.");

        });

      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoin totalSupply.");

      });
    });

    it("TeamCoinSale balance in WEI.", function() {
      return TeamCoinSale.deployed().then(function(instance) {


        return instance.weiRaised.call(); // Is this ETH?
      
      }).then(function(result) {

        assert.equal(2, result, "Balance should be 2 after purchase");

        assert.isOk(result, "OK.");

      }).catch(function(error) {
        assert.isOk(false, "Error in TeamCoinSale name.");

      });
    });

    it("Coin purchase should succeed when calling buyTokens with max amount of 1000 ether.", function() {
      return TeamCoinSale.deployed().then(function(instance) {

        return instance.buyTokens(accounts[1], {value: 1000000000000000000000}); // In Wei
      
      }).then(function(result) {

        assert.isOk(true, "Max transfer succeeded as expected.");

      }).catch(function(error) {
        console.log(error);
        assert.isOk(false, "Max transfer failed. Unexpected.");

      });
    });

    it("Coin purchase should fail when calling buyTokens with ether above max of 1000.", function() {
      return TeamCoinSale.deployed().then(function(instance) {

        return instance.buyTokens(accounts[1], {value: 1000000000000000000001}); // In Wei
      
      }).then(function(result) {

        assert.isOk(false, "BIG PURCHASE FAILED.");

      }).catch(function(error) {

        assert.isOk(true, "Too large transfer failed as expected.");

      });
    });

    it("MAXING OUT.", function() {

      return TeamCoinSale.deployed().then(function(instance) {

        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});

        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});

        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});
        instance.buyTokens(accounts[1], {value: 1000000000000000000000});

        return instance.buyTokens(accounts[1], {value: 1000000000000000000000}).then(function(result){

          assert.isOk(false, "Transaction after totalSupply reached did not fail.");

        }).catch(function(error){

          assert.isOk(true, "Transaction after totalSupply reached did not fail.");

        });


      });

    });

});