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

    switch (args.command) {
      case "set":

        if (typeof flags.domain == 'undefined') {
          this.error('--domain missing');
        }

        if (typeof flags.apikey == 'undefined') {
          this.error('--apikey missing');
        }

        var configObject = {
          apikey: flags.apikey,
          sandbox: flags.sandbox,
          domain: flags.domain
        };

        if (!ConfigHelper.setConfiguration(configObject)) {
          this.error('CLI Configuration setup failed');
        }
        Configuration = ConfigHelper.validateConfiguration();
        ConfigHelper.outputConfiguration(Configuration);
        break;
      case "get":
      default:
        ConfigHelper.outputConfiguration(Configuration);
        break;
    }

  }
}

ConfigCommand.description = `Manage Cloudonix CLI tenant information`;

ConfigCommand.flags = {
  apikey: flags.string({description: 'Cloudonix API key'}),
  sandbox: flags.boolean({description: 'Enable/Disable sandbox operations', default: false}),
  domain: flags.string({description: 'Cloudonix default domain'})
};

ConfigCommand.args = [
  {
    name: 'command',
    required: true,            // make the arg required with `required: true`
    description: `Command to execute
    
\x1b[33mget\x1b[0m       (Default) Get CLI tool configuration
\x1b[33mset\x1b[0m       Set your CLI tool configuration
          (file: ~/.env.cloudonix.cli`, // help description
    default: 'get',           // default value if no arg input
    options: ['get', 'set'],        // only allow input to be from a discrete set
  }
];

module.exports = ConfigCommand;
