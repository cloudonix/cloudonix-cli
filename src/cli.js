/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | cli.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

import arg from "arg";

const fs = require('fs');
const environmentFilename = '.env.cloudonix.cli';

/* Helpers and Modules */
var help = require('./cli_help');
var config = require('./cli_config');
var tenant = require('./module_tenant');

function parseCommandLineArguments(rawArgs) {

  var result = {};

  /* What datamodel are we going to work with? */
  const datamodelArgs = arg(
    {
      '--tenant': Boolean,
      '--domains': Boolean,
      '--trunks': Boolean,
      '--applications': Boolean,
      '--dnids': Boolean,
      '--subscribers': Boolean,
      '--config': Boolean,
      '-T': '--tenant',
      '-D': '--domains',
      '-t': '--trunks',
      '-a': '--applications',
      '-d': '--dnids',
      '-s': '--subscribers',
      '-c': '--config'
    },
    {
      permissive: true,
      argv: rawArgs.slice(2),
    }
  );

  /* Did the user request a misc command? */
  const commandMisc = arg(
    {
      '--help': Boolean,
      '-h': '--help',
    },
    {
      permissive: true,
      argv: rawArgs.slice(2),
    }
  );

  if (Object.keys(commandMisc).length == 2) {

    if (Object.keys(datamodelArgs).length != 2)
      help.help_general('Error: No datamodel argument (or too many) provided');

    switch (Object.keys(datamodelArgs)[1]) {
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
      case '--config':
        help.help_config();
        break;
    }
  }

  /* In this point, there is no misc command so we need to verify the data model */
  if (Object.keys(datamodelArgs).length != 2)
    help.help_general('Error: No datamodel argument (or too many) provided');

  result.datamodel = Object.keys(datamodelArgs)[1];
  return result;
}

export async function cli(args) {

  /* Configuration Loader */
  if (!fs.existsSync(environmentFilename)) {
    console.log('Notice: environment file missing, creating one...');
    fs.writeFile(environmentFilename, '', {mode: 0o644}, function (writeError) {
      if (writeError) throw writeError;
    });
    console.log('Notice: an empty environment file created, please use --config to configure your environment');
    process.exit(0);
  }

  const configuration = require('dotenv').config(
    {
      path: environmentFilename
    }
  );

  let cliCommand = parseCommandLineArguments(args);

  switch (cliCommand.datamodel) {
    case '--config':
      var configObject = config.parseConfigOptions(args);
      config.buildConfigFile(configObject, environmentFilename);
      process.exit(0);
      break;
    case '--tenant':
      console.log(await tenant.execute(args));
      break;
    default:
      break;
  }

}
