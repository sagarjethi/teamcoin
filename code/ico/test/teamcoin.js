var TeamCoin = artifacts.require("./TeamCoin.sol");

/*

  TODO: Make sure the owner can ALWAYS transfer! Even if the contract is still locked ... OK
  TODO: Test with real rate large numbers ... OK
  TODO: test manual unlock ...
  TODO: set hard limit to number of coins minable?

  TODO: test what happens if maximum supply is reached ... NOT TESTED
  TODO: test with big numbers TESTED

  * Make sure the wallet address is correct!
  * Make sure the inital supplys is correct!
  * Make sure the contactInformation is correct!
  * Make sure terms & md5 are correct and retrievable through IPFS
  * Make sure owner can transfer tokens BEFORE crowdsale has ended
  * Make sure coin purchases work DURING sale
  * Make sure coin purchases fail AFTER sale

*/

contract('TeamCoin', function(accounts) {

    it("Name should be TeamCoin.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.name.call();
      
      }).then(function(result) {
        
        assert.equal(result, "TeamCoin", "The token's name should be TeamCoin.");

      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoin name.");


      });
    });

    it("Symbol should be TMC.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.symbol.call();
      
      }).then(function(result) {
        
        assert.equal(result, "TMC", "The token's symbol should be TMC.");


      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoin symbol.");

      });s
    });

    it("Decimal should be 18.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.decimals.call();
      
      }).then(function(result) {
        
        assert.equal(result, 18, "The token's decimal should be 18.");


      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoin decimals.");

      });
    });

    it("Terms should be set.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.terms.call();
      
      }).then(function(result) {

        assert.equal(result, "ipfs:QmPtyYSXbPedgnijREBgHnDs6Jt1ssQk8NMgHuTchoeKZM", "Terms should be set.");


      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoin owner balance.");

      });
    });

    it("Terms md5 should be set.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.terms_md5.call();
      
      }).then(function(result) {
        
        assert.equal(result, "1aefd0716c03cfe5803598e6d27d918b", "Terms md5 should be set.");


      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoin owner balance.");

      });
    });


    it("TotalSupply should be 1201000000000000000000000.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.totalSupply.call();
      
      }).then(function(result) {
        
        assert.equal(result, 1201000000000000000000000, "The token's totalSupply should be 1201000000000000000000000.");


      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoin totalSupply.");

      });
    });

    it("Owner's address should be same as deployer.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.owner.call();
      
      }).then(function(result) {
        
        assert.equal(result, accounts[0], "Owner's address should be same as deployer.");


      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoin owner.");

      });
    });

    it("Owner's balance should be 1201000000000000000000000.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.balanceOf.call(accounts[0]);
      
      }).then(function(result) {
        
        assert.equal(result, 1201000000000000000000000, "The owner's balance should be 1201000000000000000000000.");


      }).catch(function(error) {

        assert.isOk(false, "Error in TeamCoin owner balance.");

      });
    });

    it("Random address balance should give error.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.balanceOf.call(accounts[1]);
      
      }).then(function(result) {
        
        assert.isOk(false, "Random address should hold no coins. Unexpected.");


      }).catch(function(error) {

        assert.isOk(true, "Random address holds no coins as expected.");

      });
    });


    it("Contract should be locked initially.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.locked.call();
      
      }).then(function(result) {
        
        assert.isOk(result, "Contract should be locked initially. Expected.");


      }).catch(function(error) {

        assert.isOk(false, "Contrct is not locked. Unexpected.");

      });
    });



    it("Contract can not be unlocked by attacker.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.unlock({from: accounts[1]});
      
      }).then(function(result) {
        
        assert.isOk(result, "Contract can be unlocked by attacker. Unexpected.");


      }).catch(function(error) {

        assert.isOk(true, "Contract can't be unlocked by attacker. Expected.");

      });
    });

    it("Contract should still be locked.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.locked.call();
      
      }).then(function(result) {
        
        assert.isOk(result, "Contract should be locked initially. Expected.");


      }).catch(function(error) {

        assert.isOk(false, "Contrct is not locked. Unexpected.");

      });
    });

    it("Transfer can be made by owner while contract is locked.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.transfer(accounts[1], 1).then(function(result){

          assert.isOk(true, "Transfer OK. Expected.");

        }).catch(function(error){

          assert.isOk(false, "Transfer failed. Unexpected");

        });

      });
    });


    it("Transfer cannot be made by non-owner while contract is locked.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.transfer(accounts[0], 100, {from: accounts[1]}).then(function(result){

          assert.isOk(false, "Transfer OK. Unexpected.");

        }).catch(function(error){

          assert.isOk(true, "Transfer failed. Expected");

        });

      });
    });

    it("Approve to valid address should succeed.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.approve(accounts[1], 100);
      
      }).then(function(result) {
        
        assert.isOk(true, "Approve succeeded as expected.");


      }).catch(function(error) {

        assert.isOk(true, "Approve failed.");

      });
    });


    it("Allowances should NOT be empty after approval", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.allowance(accounts[0], accounts[1]);
      
      }).then(function(result) {
        
        assert.isOk(true, "Allowances not empty. Expected");


      }).catch(function(error) {

        assert.isOk(false, "Allowances empty. Unexpected");

      });
    });

    it("Transfer from sender to receiver should fail while contract is locked", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.transferFrom(accounts[0], accounts[1], 100);
      
      }).then(function(result) {
        
        assert.isOk(false, "Transfer from sender to receiver before approval succeeded. Unexpected.");


      }).catch(function(error) {

        assert.isOk(true, "transferFrom should fail before unlock");

      });
    });


    it("Contract cannot be unlocked by non-owner.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.unlock({from: accounts[1]}).then(function(result){

          assert.isOk(false, "Unlock OK. Unexpected.");

        }).catch(function(error){

          assert.isOk(true, "Unlock failed. Expected");

        });

      });
    });

    it("Contract should still be locked.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.locked.call();
      
      }).then(function(result) {
        
        assert.equal(true, result, "Contract should be locked. Expected.");


      }).catch(function(error) {

        assert.isOk(false, "Contrct is not locked. Unexpected.");

      });
    });


    it("Contract can be unlocked by owner.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.unlock().then(function(result){

          assert.isOk(true, "Unlock OK. Expected.");

        }).catch(function(error){
          assert.isOk(false, "Unlock failed. Unexpected");

        });

      });
    });


    it("Contract should be unlocked.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.locked.call();
      
      }).then(function(result) {
        assert.equal(false, result, "Contract should be unlocked. Expected.");

      }).catch(function(error) {

        assert.isOk(false, "Contrct is not locked. Unexpected.");

      });
    });


    it("Balance of sender should hold coins after first transfer.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.balanceOf.call(accounts[0]);
      
      }).then(function(result) {

        assert.isAbove(result,0, "Sender balance should be greater than 0");
      }).catch(function(error) {

        assert.isOk(false, "Checking sender balance call failed.");

      });
    });

    it("Balance of receiver should hold coins after first transfer.", function() {
      

      return TeamCoin.deployed().then(function(instance) {

        return instance.balanceOf.call(accounts[1]).then(function(result) {


          assert.equal(result, 1, "Receiver balance should be 1");


        }).catch(function(error) {

          assert.isOk(false, "Error checking receiver balance. Unexpected.");

        });
      }); 

    });


    it("Transfer can be made by owner while contract is locked.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.transfer(accounts[1], 100).then(function(result){

          assert.isOk(false, "Transfer OK. Expected.");

        }).catch(function(error){

          assert.isOk(true, "Transfer failed. Unexpected");

        });

      });
    });

    it("Transfer CAN be made by non-owner after contract is unlocked.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.transfer(accounts[0], 100, {from: accounts[1]}).then(function(result){

          assert.isOk(true, "Transfer OK. Expected.");

        }).catch(function(error){

          assert.isOk(false, "Transfer failed. Unexpected");

        });

      });
    });





    it("Transfer self should NOT succeed.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.transfer(accounts[0], 100).then(function(result){

          assert.isOk(false, "Transfer OK. Unexpected.");

        }).catch(function(error){

          assert.isOk(true, "Transfer failed. Expected");

        });
      });
    });


    it("Transfer should succeed.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.transfer(accounts[1], 100).then(function(result){

          assert.isOk(true, "Transfer OK. Expected.");

        }).catch(function(error){

          assert.isOk(false, error);

        });
      });
    });


    it("Transfer to self should Fail.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.transfer(accounts[0], 100).then(function(result){
        
          assert.isOk(false, "Transfer to self did not fail. Unexpected.");

        }).catch(function(error) {

          assert.isOk(true, "Transfer to self failed as expected.");

        });
      });
    });

    it("Transfer to invalid address should Fail.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.transfer("asdf", 100).then(function(result){
      
          assert.isOk(false, "Transfer to invalid address did not fail. Unexpected");

        }).catch(function(error) {

          assert.isOk(true, "Transfer to invalid address failed as expected.");

        });
      });
    });

    it("Transfer to short address should Fail.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.transfer(0x6324136827576ba5d71e2d3b301f78eece34262245a0385445884dc0ff00, 100).then(function(result){
      
          assert.isOk(false, "Transfer to short address did not fail. Unexpected.");

        }).catch(function(error) {

          assert.isOk(true, "Transfer to short address failed as expected.");

        });
      });
    });

    it("Transfer to short address should fail again", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.transfer(0x6324136827576ba5d71e2d3b301f7, 100).then(function(result){
        
          
          assert.isOk(false, "Transfer to invalid address did not fail.");


        }).catch(function(error) {

          assert.isOk(true, "Transfer to invalid address failed as expected.");

        });
      });
    });


    it("Balance of receiver after first transfer should hold more coins.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.balanceOf.call(accounts[0]);
      
      }).then(function(result) {
        
        assert.isAbove(result,0, "Receiver balance should be greater than 0");
        assert.equal(result, 100, "Receiver balance should be 100");


      }).catch(function(error) {

        assert.isOk(error, "Checking balance call failed.");

      });
    });



    //  function allowance(address _owner, address _spender) constant returns (uint256 remaining)  {

    it("There should be no allowances initially.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.allowance(accounts[0], accounts[1]);
      
      }).then(function(result) {
        
        assert.isOk(false, "There should be no allowances initially.");


      }).catch(function(error) {

        assert.isOk(true, "There should be no allowances initially.");

      });
    });

    it("Transfer from sender to receiver should fail before approval.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.transferFrom(accounts[0], accounts[1], 100);
      
      }).then(function(result) {
        
        assert.isOk(false, "Transfer from sender to receiver before approval did not fail.");


      }).catch(function(error) {

        assert.isOk(true, "Transfer from sender to receiver before approval failed as expected.");

      });
    });


    it("Transfer from random sender to random receiver should fail before approval.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.transferFrom(accounts[3], accounts[2], 100);
      
      }).then(function(result) {
        
        assert.isOk(false, "Transfer from sender to receiver before approval did not fail.");


      }).catch(function(error) {

        assert.isOk(true, "Transfer from sender to receiver before approval failed as expected.");

      });
    });

    it("Approve to self should fail.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.approve(accounts[0], 100);
      
      }).then(function(result) {
        
        assert.isOk(false, "Approve succeeded.");


      }).catch(function(error) {

        assert.isOk(true, "Approve failed as expected.");

      });
    });


    it("Allowances should be empty before approval", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.allowance(accounts[0], accounts[1]);
      
      }).then(function(result) {
        
        assert.isOk(true, "Allowance call succeeded. Unexpected.");


      }).catch(function(error) {

        assert.isOk(true, "Allowance call failed as expected.");

      });
    });

    it("Approve to valid address should succeed.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.approve(accounts[1], 100);
      
      }).then(function(result) {
        
        assert.isOk(true, "Approve succeeded as expected.");


      }).catch(function(error) {

        assert.isOk(true, "Approve failed.");

      });
    });


    it("Allowances should NOT be empty after approval", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.allowance(accounts[0], accounts[1]);
      
      }).then(function(result) {
        
        assert.equal(result, 100, "Allowance is 100. Expected.")


      }).catch(function(error) {

        assert.isOk(false, "Allowance is not 100. Unexpected.")

      });
    });



    it("Transfer from sender to receiver should succeed after approval.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.transferFrom(accounts[0], accounts[1], 100);
      
      }).then(function(result) {
        
        assert.isOk(true, "Transfer from sender to receiver after approval succeeded as expected.");

      }).catch(function(error) {

        assert.isOk(false, error);

      });
    });

    it("Too large transfer from sender to receiver should fail after approval.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.transferFrom(accounts[0], accounts[1], 1000);
      
      }).then(function(result) {
        
        assert.isOk(false, "Transfer should not have succeeded. Unexpected.");


      }).catch(function(error) {

        assert.isOk(true, "Transfer failed. Expected.");

      });
    });

    it("Contract cannot be destroyed by non-owner.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.destroy({from: accounts[1]}).then(function(result){

          assert.isOk(false, "Destroy OK. Unexpected.");

        }).catch(function(error){

          assert.isOk(true, "Destroy failed. Expected");

        });

      });
    });



    it("Contract CAN be destroyed by owner.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.destroy({from: accounts[0]}).then(function(result){

          assert.isOk(true, "Destroy OK. Expected.");

        }).catch(function(error){

          assert.isOk(false, "Destroy failed. Unexpected");

        });

      });
    });

    it("Contract should be dead.", function() {
      return TeamCoin.deployed().then(function(instance) {

        return instance.name.call();
      
      }).then(function(result) {
        
        assert.isOk(false, "Contract can still be called. Unexpected.");

      }).catch(function(error) {

        assert.isOk(true, "Contract can no longer be called. Expected.");


      });
    });

});

