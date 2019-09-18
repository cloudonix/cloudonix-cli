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

const CloudonixModel = require('../datamodels/SubscribersModel');
const {Command, flags} = require('@oclif/command');
const inquirer = require('inquirer');
const clearscreen = require('clear');
const prettyjson = require('prettyjson');

class SubscribersCommand extends Command {

  async run() {

    const {flags} = this.parse(SubscribersCommand);
    const {args} = this.parse(SubscribersCommand);
    var result = {};

    CloudonixModel.setTenantIdent(flags, 'subscribers');
    CloudonixModel.connect();

    if (typeof flags.domain === 'undefined') {
      flags.domain = process.env.DOMAIN;
    }

    /* Run the command */
    switch (args.command) {
      case "get":
        result = await CloudonixModel.get(flags);
        break;
      case "create":
        result = await CloudonixModel.create(flags);
        break;
      case "revoke":
        result = await CloudonixModel.revoke(flags);
        break;
      case "update":
        result = await CloudonixModel.update(flags);
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

SubscribersCommand.description = `Manage Cloudonix subscribers data model
A subscriber represents a single user-agent endpoint that connects to the platform.
The user-agent can either be a remote website (using the Cloudonix WebSDK), a remote
SIP phone or a mobile application (using the Cloudonix mobile SDK).

The 'subscribers' module enables the tenant administrator to manage the tenants subscribers.
`;

SubscribersCommand.usage = "subscribers COMMAND [OPTIONS]";

SubscribersCommand.flags = {
  tenant: flags.string({description: 'Tenant name or ID', exclusive: ['self']}),
  self: flags.boolean({
    description: '[default] Refer to the tenant indicated by the configured API key',
    exclusive: ['tenant']
  }),
  domain: flags.string({description: '[Default: Environment Variable] Domain name or domain ID associated to the subscriber'}),
  msisdn: flags.string({description: 'A subscriber identified, normally a numerical string. For simplicity, use a phone nubmer.'}),
  enable: flags.boolean({
    description: '[Default] Set the subscriber as enabled',
    exclusive: ['disable']
  }),
  disable: flags.boolean({
    description: 'Set the subscriber as disabled',
    exclusive: ['enable']
  }),
  password: flags.string({
    description: '[Default: auto-generated] An assigned password for the subscriber.'
  }),
  reset: flags.boolean({
    description: 'Reset a subscribers SIP password'
  }),
};

SubscribersCommand.args = [
  {
    name: 'command',
    required: true,                     // make the arg required with `required: true`
    description: `Command to execute
    
\x1b[33mget\x1b[0m       Get subscriber or list of
\x1b[33mcreate\x1b[0m    Create subscriber
\x1b[33mupdate\x1b[0m    Update subscriber
\x1b[33mrevoke\x1b[0m    Delete subscriber`,

    default: 'get',                     // default value if no arg input
    options: ['get', 'create', 'update', 'revoke'],        // only allow input to be from a discrete set
  }
];

SubscribersCommand.examples = [
  'Get list of subscriber and their information\n$ cloudonix-cli subscribers get --self --domain=mydomain.org\n',
  'Get subscriber information\n$ cloudonix-cli subscribers get --self --domain=mydomain.org --msisdn=123455777\n',
  'Revoke a subscriber\n$ cloudonix-cli subscribers revoke --self --domain=mydomain.org --msisdn=123455777\n',
];

module.exports = SubscribersCommand;
