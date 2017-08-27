from web3 import Web3, KeepAliveRPCProvider, IPCProvider

web3 = Web3(IPCProvider())
print web3.version.ethereum
print web3.isAddress("123")

print web3.eth.contract("0x744d70fdbe2ba4cf95131626614a1763df805b9e")