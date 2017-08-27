var bip39 = require("bip39");
var hdkey = require('ethereumjs-wallet/hdkey');
var ProviderEngine = require("web3-provider-engine");
var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var FilterSubprovider = require('web3-provider-engine/subproviders/filters.js')
var Web3 = require("web3");

// Get our mnemonic and create an hdwallet
var mnemonic = "fall summer baby potato annual during force horror orbit chimney mercy fancy begin coach excess";
var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));

// Get the first account using the standard hd path.
var wallet_hdpath = "m/44'/60'/0'/0/";
var wallet = hdwallet.derivePath(wallet_hdpath + "0").getWallet();
var address = "0x" + wallet.getAddress().toString("hex");

var providerUrl = "https://mainnet.infura.io/RhuuIFkweu2iRs3EkaAB "; // 
var engine = new ProviderEngine();
engine.addProvider(new WalletSubprovider(wallet, {}));
engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));
engine.addProvider(new FilterSubprovider())

engine.on('error', function(err) {
    console.error(err.stack)
});

engine.start(); // Required by the provider engine.

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8888,
      network_id: "*", 
      gas: 30000000,
    },
    live: {
      network_id: 1,    // Official ropsten network id
      provider: engine, // Use our custom provider
      from: address,     // Use the address we derived
      gas: 1000000,
      gasPrice: 100000000000
    }
  },
  rpc: {
    // Use the default host and port when not using ropsten
    host: "localhost",
    port: 8545
  }
};