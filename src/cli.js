import arg from "arg";

var help = require('./cli_help');

function parseCommandLineArguments(rawArgs) {

  var result = {}

  const datamodelArgs = arg(
    {
      '--tenant': Boolean,
      '--domains': Boolean,
      '--trunks': Boolean,
      '--applications': Boolean,
      '--dnids': Boolean,
      '--subscribers': Boolean,
      '--users': Boolean,
      '-T': '--tenant',
      '-D': '--domains',
      '-t': '--trunks',
      '-a': '--applications',
      '-d': '--dnids',
      '-s': '--subscribers',
      '-u': '--users',
    },
    {
      permissive: true,
      argv: rawArgs.slice(2),
    }
  );

  if (Object.keys(datamodelArgs).length != 2)
    help.help_general('Error: Missing datamodel argument');

  result.datamodel = Object.keys(datamodelArgs)[1];

  const commandHelp = arg(
    {
      '--help': Boolean,
      '-h': '--help'
    },
    {
      permissive: true,
      argv: rawArgs.slice(2),
    }
  );

  if (Object.keys(commandHelp).length == 2) {
    switch (result.datamodel) {
      case '--tenant':
        help.help_tenant();
        break;
      case '--domains':
        help.help_domains();
        break;
      case '--subscribers':
        help.help_subscribers();
        break;
      case '--dnids':
        help.help_dnids();
        break;
      case '--applications':
        help.help_applications();
        break;
      case '--trunks':
        help.help_trunks();
        break;
      case '--users':
        help.help_users();
        break;
    }
  }

  const commandArgs = arg(
    {
      '--list': Boolean,
      '--create': Boolean,
      '--get': Boolean,
      '--delete': Boolean,
      '--update': Boolean,
    },
    {
      permissive: true,
      argv: rawArgs.slice(2),
    }
  );

  if (Object.keys(commandArgs).length != 2)
    help.help_general('Error: Missing command argument');

  result.command = Object.keys(commandArgs)[1];

  return result;
}

export async function cli(args) {
  let commandArguments = parseCommandLineArguments(args);
}
