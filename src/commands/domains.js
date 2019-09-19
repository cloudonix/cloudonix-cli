/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | domains.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const prettyjson = require('prettyjson');
const CloudonixModel = require('../datamodels/DomainsModel');
const {Command, flags} = require('@oclif/command');

class DomainsCommand extends Command {

  async run() {

    const {flags} = this.parse(DomainsCommand);
    const {args} = this.parse(DomainsCommand);
    var result = {};

    CloudonixModel.setTenantIdent(flags);

    /* Build the HTTP connector to Cloudonix API endpoint */
    CloudonixModel.connect();

    /* Run the command */
    switch (args.action) {
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
      case "config":
        result = await CloudonixModel.config(flags);
        break;
    }

    if (typeof result == 'undefined') {
      this.error('A General error occurred - no additional information is available. Please open a ticket.');
    } else if (result.status == 204) {
      this.log(prettyjson.render({ status: 204, data: 'No Content', message: 'Operation completed successfully.'}));
    } else if (result.status != 200) {
      this.error(result.message);
    } else {
      console.log(prettyjson.render(result.data));
    }
  }
}

DomainsCommand.description = `Manage Cloudonix tenant domains data models

A Cloudonix Tenant may have multiple domains associated with it. While 
a single tenant may have multiple domains, communications or 
inter-domain data sharing is not available. Domains are treated as 
discrete logical elments. Domains may have applications, DNIDs, trunks 
and subscribers associated to them.
`;

DomainsCommand.usage = `domains COMMAND [OPTIONS]`;

DomainsCommand.flags = {
  tenant: flags.string({description: 'Tenant name or id', exclusive: ['self']}),
  self: flags.boolean({
    description: '[default] Refer to the tenant indicated by\nthe configured API key',
    exclusive: ['tenant']
  }),
  name: flags.string({description: 'Domain name, aka: namespace'}),
  id: flags.integer({description: 'Domain ID, aka: namespace ID'}),
  newname: flags.string({description: 'Rename --name to --newname\n(used with `update` action)'}),
  active: flags.boolean({description: 'Set the domain as Active or Inactive\n(used with `config` action)'}),
  regfree: flags.boolean({description: 'Set the domain as RegistrationFree\nenabled or disabled (used with `config` action)'}),
  app: flags.integer({description: 'Set the domain default application ID\n(used with `config` action)'}),
  'set': flags.boolean({description: 'Set alias or key:value pair\n(used with `config` action)', exclusive: ['unset']}),
  unset: flags.boolean({description: 'Unset alias or key:value pair\n(used with `config` action)', exclusive: ['set']}),
  alias: flags.string({description: 'Set or unset a domain alias for domain\n(used with `config` action) or get domain\nby alias (used with `get` action)'}),
  aliases: flags.boolean({description: 'Get list of domain aliases\n(used with `get` action)'}),
  pair: flags.string({description: 'Set a domain profile key:value\npair, as designated by `pair` and `value`\n(used with `config` action)'}),
  value: flags.string({
    description: 'Assign the `value` to the new profile key:value\npair, designated by `pair`\n(used with `config` action)',
    dependsOn: ['pair']
  }),
};

DomainsCommand.args = [
  {
    name: 'action',
    required: true,                     // make the arg required with `required: true`
    description: `Command to execute
    
\x1b[33mget\x1b[0m       Get domain or list all
\x1b[33mcreate\x1b[0m    Create domain
\x1b[33mupdate\x1b[0m    Update domain
\x1b[33mrevoke\x1b[0m    Delete domain
\x1b[33mconfig\x1b[0m    Manipulate domain settings`,  // help description
    default: 'get',                     // default value if no arg input
    options: ['get', 'config', 'create', 'update', 'revoke'],        // only allow input to be from a discrete set
  }
];

DomainsCommand.examples = [
  'Get list of domains and their information\n$ cloudonix-cli domains get\n',
  'Get domain information\n$ cloudonix-cli domains get --name=mydomain.cloudonix.io\n',
  'Set a domain alias\n$ cloudonix-cli domains config --name=mydomain.cloudonix.io --set \\\n--alias=alias.cloudonix.io\n',
  'Disable a domain\n$ cloudonix-cli domains config --name=mydomain.cloudonix.io --unset \\\n--active\n',
];

module.exports = DomainsCommand;
