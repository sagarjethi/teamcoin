# -*- coding: utf-8 -*-
"""Internal Functions
"""
from web3 import Web3, KeepAliveRPCProvider, IPCProvider

def online():
	try:
		web3 = Web3(IPCProvider())
		if False != web3.version.ethereum:
			return True
		else:
			return False
	except:
		return False

def profile_id():
	return "0x744d70fdbe2ba4cf95131626614a1763df805b9e" # FIXME: hardcoded ...


