# -*- coding: utf-8 -*-
"""Commands

Entrypoint for command-line argument dispatch
"""

import json, sys, pickle, os
from grapheekdb.backends.data.localmem import LocalMemoryGraph

import helpers

def login(args):
	raise NotImplementedError

def logout(args):
	raise NotImplementedError

def init(args):
	# Initialize empty database in the current directory
	pickled = pickle.dumps(json.dumps("{}"))
	with open(".san", "w") as out:
		out.write(pickled)

def destroy(args):
	os.remove(".san")

def status(args):
	# Check if a .san file is present
	if os.path.exists(".san"):
		try:
			file = open(".san", "r")
			g = pickle.load(file)
			g.V()
			print "OK" # TODO: more meaningful stats here
		except:
			print "Invalid SAN Store: wrong data in .san file."
	else:
		print "No SAN Store Found: missing .san file."

def list(args):
	print args
	raise NotImplementedError

def push(args):
	if False == helpers.online():
		print "No connection to the Ethereum Network"
		return
	print "Pushing to SAN on Ethereum"

def pull(args):
	if False == helpers.online():
		print "No connection to the Ethereum Network"
		return

	print "Pulling %s from SAN on Ethereum" % args["<id>"]
def vote(args):
	raise NotImplementedError

def load(args):

	# Load from STDIN or FILE
	if False == args["-i"]:
		data = json.loads(sys.stdin.readlines())
	else:
		with open(args["<filename>"], 'r') as infile:
			data=json.loads(infile.read())
	
	# Setup Graph store in memory 
	g = LocalMemoryGraph()
	# Parse Nodes
	for node in data["graph"]["nodes"]:
		g.add_node(label=node["label"], type=node["type"], uuid=node["id"])

	# Parse Edges
	for edge in data["graph"]["edges"]:
		source = ""
		for s in g.V(uuid=edge["source"]):
			source=s
			break
		target = ""
		for t in g.V(uuid=edge["target"]):
			target=t
			break
		g.add_edge(source, target, action=edge["relation"], weight=edge["metadata"]["weight"])

	# Overwrite local .san file ...
	with open(".san", "w") as out:
		out.write(pickle.dumps(g))


def dump(args):
	# Read .san
	file = open(".san", "r")
	g = pickle.load(file)

	data = {"nodes": [], "edges": []}

	for node in g.V(type="project"):
		data["nodes"].append({"id": node.uuid, "label": node.label, "type": node.type})


	for node in g.V(type="people"):
		data["nodes"].append({"id": node.uuid, "label": node.label, "type": node.type})


	for edge in g.E():
		source = None
		for node in edge.inV():
			source = node
			break

		target = None
		for node in edge.outV():
			target = node
			break
		data["edges"].append({"source": source.uuid, "target": target.uuid, "relation": edge.action})



	# Dump to STDOUT or FILE
	if False == args["-o"]:
		print json.dumps(data)
	else:
		with open(args["<filename>"], "w") as out:
			out.write(json.dumps(data))

def show(args):
	if False != args["<id>"]:
		if "profile" == args["<id>"]:
			print "Showing SAN ID: %s" % helpers.profile_id()
		else:
			print "Showing SAN ID: %s" % args["<id>"]


def create(args):
	# Create a project, people or relaation
	raise NotImplementedError

def delete(args):
	if False != args["<id>"]:
		print "Deleting id: %s" % args["<id>"]

def fail(args):
	raise NotImplementedError
