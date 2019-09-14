/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | config.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */


const {Command, flags} = require('@oclif/command');
const ConfigHelper = require('../helpers/Configuration');
const Client = require('../helpers/Client');

class ConfigCommand extends Command {

  async run() {

    var Configuration = ConfigHelper.validateConfiguration();

    const {flags} = this.parse(ConfigCommand);
    const {args} = this.parse(ConfigCommand);

    if ((!Configuration) && (args.command!="set")) {
      this.error('CLI Configuration missing or mis-configured, use `cloudonix-cli config --help` to setup your CLI tool');
    }

    switch (args.command) {
      case "set":
        var configObject = {
          apikey: flags.apikey,
          sandbox: flags.sandbox
        };
        if (!ConfigHelper.setConfiguration(configObject)) {
          this.error('CLI Configuration setup failed');
        }
        Configuration = ConfigHelper.validateConfiguration();
        ConfigHelper.outputConfiguration(Configuration);
        break;
      case "get":
        ConfigHelper.outputConfiguration(Configuration);
        break;
    }

  }
}

ConfigCommand.description = `Configure the Cloudonix CLI`;

ConfigCommand.flags = {
  apikey: flags.string(
    {
      description: 'Cloudonix API key'
    }),
  sandbox: flags.boolean(
    {
      description: 'Enable/Disable sandbox operations'
    }),
};

ConfigCommand.args = [
  {
    name: 'command',
    required: true,            // make the arg required with `required: true`
    description: 'Command to execute', // help description
    default: 'get',           // default value if no arg input
    options: ['get', 'set'],        // only allow input to be from a discrete set
  }
];

module.exports = ConfigCommand;
