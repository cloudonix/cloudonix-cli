/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | subscribers.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const CloudonixModel = require('../datamodels/ApikeysModel');
const {Command, flags} = require('@oclif/command');
const inquirer = require('inquirer');
const clearscreen = require('clear');
const prettyjson = require('prettyjson');

class ApikeyCommand extends Command {

  async run() {

    const {flags} = this.parse(ApikeyCommand);
    const {args} = this.parse(ApikeyCommand);
    var result = {};

    CloudonixModel.setTenantIdent(flags, 'apikeys');
    CloudonixModel.connect();

    if (typeof flags.domain === 'undefined') {
      flags.domain = process.env.DOMAIN;
    }

    /* Run the command */
    switch (args.command) {
      case "create":
        result = await CloudonixModel.create(flags);
        break;
      case "revoke":
        result = await CloudonixModel.revoke(flags);
        break;
      case "get":
      default:
        result = await CloudonixModel.get(flags);
        break;
    }

    if (typeof result == 'undefined') {
      this.error('A General error occurred - no additional information is available. Please open a ticket.');
    } else if (result.status == 204) {
      this.log(prettyjson.render({status: 204, data: 'No Content', message: 'Operation completed successfully.'}));
    } else if (result.status != 200) {
      this.error(result.message);
    } else {
      console.log(prettyjson.render(result.data));
    }
  }
}

ApikeyCommand.description = `Manage Cloudonix API keys data model
An API key represents a Cloudonix API access token. Cloudonix maintains 
various API keys, separated to multiple access levels. The following 
is list of API key levels you can use:
 
\x1b[33mdomain\x1b[0m         A Domain (aka: namespace) level API key. 
              Controls: Domain, Trunk, Applications, 
              Subscribers, DNIDs
\x1b[33mapplication\x1b[0m    An Application level API key. Controls: 
              Applications control only

The 'apikeys' module enables the tenant administrator to manage the 
tenants API keys.
`;

ApikeyCommand.usage = "apikeys COMMAND [OPTIONS]";

ApikeyCommand.flags = {
  tenant: flags.string({description: 'Tenant name or ID', exclusive: ['self']}),
  self: flags.boolean({
    description: '[default] Refer to the tenant indicated by the configured API key',
    exclusive: ['tenant']
  }),
  domain: flags.string({description: '[Default: Environment Variable] Domain name or domain ID associated to the API key'}),
  application: flags.string({description: 'Application name or ID associated to the API key'}),
  name: flags.string({description: 'A string value, representing the API key'}),
};

ApikeyCommand.args = [
  {
    name: 'command',
    required: true,                     // make the arg required with `required: true`
    description: `Command to execute
    
\x1b[33mget\x1b[0m       Get list of API keys
\x1b[33mcreate\x1b[0m    Create API key
\x1b[33mrevoke\x1b[0m    Delete API key`,

    default: 'get',                     // default value if no arg input
    options: ['get', 'create', 'revoke'],        // only allow input to be from a discrete set
  }
];

ApikeyCommand.examples = [
  `Get list of API keys and their information\n$ cloudonix-cli apikeys get --self \\
  --domain=mydomain.org\n`,
  `Generate an API key\n$ cloudonix-cli apikeys create --self --domain=mydomain.org \\
  --name=my-key-name\n`,
  `Revoke an API key\n$ cloudonix-cli apikeys revoke --self --domain=mydomain.org \\
  --name=my-key-name\n`,
];

module.exports = ApikeyCommand;
