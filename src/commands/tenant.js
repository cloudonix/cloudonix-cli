/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | tenant.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const prettyjson = require('prettyjson');
const CloudonixModel = require('../datamodels/TenantModel');
const {Command, flags} = require('@oclif/command');

class TenantCommand extends Command {

  async run() {

    const {flags} = this.parse(TenantCommand);
    const {args} = this.parse(TenantCommand);
    var result = {};

    CloudonixModel.setTenantIdent(flags);
    CloudonixModel.connect();

    /* Run the command */
    switch (args.command) {
      case "get":
        result = await CloudonixModel.get();
        break;
      case "settings":
        if (typeof flags.addpair != 'undefined') {
          /* Add a new profile key:value pair */
          result = await CloudonixModel.settingsAttributeSet(flags);
        }
        else if (typeof flags.delpair != 'undefined') {
          /* Del a profile key:value pair */
          result = await CloudonixModel.settingsAttributeDelete(flags);
        }
        else {
          /* Get tenant profile */
          result = await CloudonixModel.settingsGet();
        }
        break;
      case "apikey":
        if (typeof flags.generate != 'undefined') {
          /* Generate a new Tenant API key */
          result = await CloudonixModel.apikeyGenerate(flags);
        }
        else if (typeof flags.revoke != 'undefined') {
          /* Revoke an existing Tenant API key */
          result = await CloudonixModel.apikeyRevoke(flags);
        } else {
          /* Get tenant API keys */
          result = await CloudonixModel.apikeyGet(flags);
        }
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

TenantCommand.description = `Manage Cloudonix tenant data model

A tenant represents the highest level of authorization a Cloudonix 
platform customer can have. Tenants maintain multiple sets of 
domains, applications, trunks, DNIDs and more.

The 'tenant' module enables the tenant administrator to query the 
tenant configuration and control various teant related settings.
`;

TenantCommand.usage = "tenant COMMAND [OPTIONS]";

TenantCommand.flags = {
  name: flags.string({description: 'Tenant name', exclusive: ['id', 'self']}),
  id: flags.integer({description: 'Tenant ID', exclusive: ['name', 'self']}),
  self: flags.boolean({description: '[default] Refer to the tenant indicated\nby the configured API key', exclusive: ['id', 'name']}),
  generate: flags.string({description: 'Generate a new API key, and set its name'}),
  revoke: flags.string({description: 'Revoke an API key, indicated by its name'}),
  keyid: flags.integer({description: 'Get API key information',  exclusive: ['keylist']}),
  keylist: flags.boolean({description: '[default] Get API key list', exclusive: ['keyid']}),
  setpair: flags.string({description: 'Set a tenant settings key:value pair,\nas designated by `addpair` and `value`'}),
  delpair: flags.string({description: 'Delete a tenant settings key:value pair,\nas designated by `delkey`'}),
  value: flags.string({description: 'Assign the `value` to the new settings pair,\ndesignated by `addpair`',dependsOn: ['addpair']}),
};

TenantCommand.args = [
  {
    name: 'command',
    required: true,                     // make the arg required with `required: true`
    description: 'Command to execute',  // help description
    default: 'get',                     // default value if no arg input
    options: ['get', 'settings', 'apikey'],        // only allow input to be from a discrete set
  }
];

TenantCommand.examples = [
  'Get my tenant information\n$ cloudonix-cli tenant get --self\n',
  'List all tenant associated API keys (all types)\n$ cloudonix-cli tenant apikey --getkey --self\n',
  'Add a tenant setting to your tenant\n$ cloudonix-cli tenant settings --addpair=new-key \\\n--value=new-value --self\n',
];

module.exports = TenantCommand;
