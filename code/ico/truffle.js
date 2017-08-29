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
      //provider: engine, // Use our custom provider
      //from: address,     // Use the address we derived
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