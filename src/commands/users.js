/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | users.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const CloudonixModel = require('../datamodels/UsersModel');
const {Command, flags} = require('@oclif/command');
const inquirer = require('inquirer');
const clearscreen = require('clear');
const prettyjson = require('prettyjson');

class UsersCommand extends Command {

  async run() {

    const {flags} = this.parse(UsersCommand);
    const {args} = this.parse(UsersCommand);
    var result = {};

    CloudonixModel.setTenantIdent(flags, 'users');
    CloudonixModel.connect();

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

UsersCommand.description = `Manage Cloudonix users. 

Users are identified by e-Mail addresses, that can be authenticated 
using either Google, Facebook, Github or Microsoft365 authentication 
providers. Users may be associated with a tenant or a domain. 

Once a user is associated with a domain, it has access to domain 
related data models only.

The 'users' module enables the tenant administrator to manage the 
tenants associated users and domain associated users.
`;

UsersCommand.usage = "users COMMAND [OPTIONS]";

UsersCommand.flags = {
  tenant: flags.string({description: 'Tenant name or ID', exclusive: ['self']}),
  self: flags.boolean({
    description: '[default] Refer to the tenant indicated by\nthe configured API key',
    exclusive: ['tenant']
  }),
  domain: flags.string({description: 'Domain name or domain ID associated to the\nusername, if not specified - reference\nto Tenant user'}),
  username: flags.string({description: 'Username to create or revoke. A username MUST be\na valid e-Mail address'}),
};

UsersCommand.args = [
  {
    name: 'command',
    required: true,                     // make the arg required with `required: true`
    description: `Command to execute
    
\x1b[33mget\x1b[0m       Get user information of list of
\x1b[33mcreate\x1b[0m    Create user
\x1b[33mrevoke\x1b[0m    Delete user`,
    default: 'get',                     // default value if no arg input
    options: ['get', 'create', 'update', 'revoke'],        // only allow input to be from a discrete set
  }
];

UsersCommand.examples = [
  'Get list of users and their information\n$ cloudonix-cli users get --self --domain=mydomain.org\n',
  'Revoke a user\n$ cloudonix-cli users revoke --self --domain=mydomain.org \\\n--username=my-username@mydomain.com\n',
];

module.exports = UsersCommand;
