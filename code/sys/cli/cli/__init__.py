# -*- coding: utf-8 -*-
"""
SAN : Distributed Contribution System

Usage:
  san login -i <filename>
  san logout
  san init
  san destroy
  san status
  san push
  san pull <id>
  san vote
  san load
  san load -i <filename>
  san dump
  san dump -o <filename>
  san show <id>
  san list (people|relations|projects)
  san create (person|relation|project)
  san create (person|relation|project) -i
  san update (person|relation|project)
  san update (person|relation|project) -i
  san delete <id>
  san (-h | --help)
  san (-v | --version)

Options:
  -h --help     Show this screen.
  -v --version  Show version.

NAME

  SAN : Distributed Contribution System

DESCRIPTION

  The SAN cli allows you to interact with people, projects & relations
  in the SAN Blockchain. All modifications are first saved in a local
  cache & then synced to the SAN Blockchain via push.

HELP
  san login -i <filename>   : Login to the SAN network with your key file.
  san logout                : Logout
  san init                  : Initialize a local SAN Cache.
  san destroy               : Destroy your local SAN Cache.
  san status                : Provides status info about local SAN Cache.
  san push                  : Publish local SAN Cache to SAN Blockchain
  san pull <id>             : Pull from Blockchain & store in local SAN Cache.
  san vote                  : Scan local SAN Cache for things to vote on.
  san load                  : Load JSON into local SAN Cache from <STDIN>
  san load -i <filename>    : Load JSON into local SAN Cache from <filename>
  san dump                  : Output local SAN Cache as JSON to <STDOUT>
  san dump -o <filename>    : Output local SAN Cache as JSON to <filename>
  san show <id>             : Show information about <id>.
  san list (people|relations|projects)
                            : List information in human-readable format.
  san create (person|relation|project)      
                            : Create from JSON piped into <STDIN>
  san create (person|relation|project) -i <filename>  
                            : Create from JSON in <filename>
  san update (person|relation|project)      
                            : Update from JSON piped into <STDIN>
  san update (person|relation|project) -i <filename> 
                            : Update from JSON in <filename>
  san delete <id>           : Delete object at ID from local Cache
  san (-h | --help)         : Show this screen.
  san (-v | --version)      : Show version.
"""


# Dependencies
from docopt import docopt

# Builtins
import sys

# Custom Modules
import commands
import metadata

def get_first(iterable, default=None):
    if iterable:
        for item in iterable:
            return item
    return default

def is_command(s):
    if s.startswith('-'):
        return False
    if s.startswith('<'):
        return False
    return True

def dispatch_command(arguments, command='fail'):
    f = getattr(commands, "{}".format(command), commands.fail)
    f(arguments)

def main():
	"""Entry point for the application script"""
	version_string = '{0} {1}'.format(metadata.project, metadata.version)
	arguments = docopt(__doc__, version=metadata.version)
	command = get_first([
		k for (k, v) in arguments.iteritems()
		if (v and is_command(k))])
	try:
		dispatch_command(arguments, command)
	except:
		print "Error %s" % sys.exc_info()[0]

def entry_point():
    """Zero-argument entry point for use with setuptools/distribute."""
    main()

if __name__ == "__main__":
    main()