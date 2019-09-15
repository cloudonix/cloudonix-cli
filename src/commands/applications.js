/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | applications.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const applicationVendors = require('../datasets/applications');
const CloudonixModel = require('../datamodels/ApplicationsModel');
const {Command, flags} = require('@oclif/command');
const inquirer = require('inquirer');
const prettyjson = require('prettyjson');

class ApplicationsCommand extends Command {

  async run() {
    const {flags} = this.parse(ApplicationsCommand);
    const {args} = this.parse(ApplicationsCommand);
    var result = {};

    CloudonixModel.setTenantIdent(flags, 'applications');
    CloudonixModel.connect();

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
      case "wizard":
        result = await this.wizard(flags);
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

  async wizard(flags) {
    return {
      status: 200,
      message: 'Not implemented yet',
      data: 'Not implemented yet'
    }
  }

}

ApplicationsCommand.description = `Manage Cloudonix applications data model
An application represents a logic element, implementing one of Cloudonix's Voice or SMS application APIs.

The 'applications' module enables the tenant administrator to manage the tenants applications.
`;

ApplicationsCommand.usage = "applications COMMAND [OPTIONS]";

ApplicationsCommand.flags = {
  tenant: flags.string({description: 'Tenant name or ID', exclusive: ['self']}),
  self: flags.boolean({
    description: '[Default] Refer to the tenant indicated by the configured API key',
    exclusive: ['tenant']
  }),
  domain: flags.string({description: 'Domain name or domain ID associated to the application', required: true}),
  name: flags.string({description: 'Application name'}),
  id: flags.integer({description: 'Application ID'}),
  url: flags.string({description: 'Application remote URL'}),
  type: flags.string({
    description: 'Application API language',
    options: ['cloudonix', 'twiml'],
    default: 'cloudonix'
  }),
  enable: flags.boolean({
    description: 'Set the application as enabled',
    exclusive: ['disable']
  }),
  disable: flags.boolean({
    description: 'Set the application as disabled',
    exclusive: ['enable']
  }),
};

ApplicationsCommand.args = [
  {
    name: 'command',
    required: true,                     // make the arg required with `required: true`
    description: `Command to execute
    
\x1b[33mget\x1b[0m       Get application info or list of
\x1b[33mcreate\x1b[0m    Create application
\x1b[33mupdate\x1b[0m    Update application
\x1b[33mrevoke\x1b[0m    Delete application
\x1b[33mwizard\x1b[0m    Application wizard - connect with verified compatible application providers or create a custom app`,

    default: 'get',                     // default value if no arg input
    options: ['get', 'create', 'update', 'revoke', 'wizard'],        // only allow input to be from a discrete set
  }
];

ApplicationsCommand.examples = [
  'Get list of applications and their information\n$ cloudonix-cli applications get --domain=mydomain.org\n',
  'Get application information\n$ cloudonix-cli applications get --self --domain=mydomain.org --name=my-app-name\n',
  'Create an application\n$ cloudonix-cli applications create --self --domain=mydomain.org --name=my-app-name --type=cloudonix --url=https://myurl.com/script\n',
  'Revoke an application\n$ cloudonix-cli applications revoke --self --domain=mydomain.org --name=my-app-name\n',
];

module.exports = ApplicationsCommand;
