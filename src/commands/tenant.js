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

const {Command, flags} = require('@oclif/command');
const ConfigHelper = require('../helpers/Configuration');
const Client = require('../helpers/Client');
const TenantModel = require('../datamodels/TenantModel');

require('console.json');

class TenantCommand extends Command {

  async run() {

    var Configuration = ConfigHelper.validateConfiguration();
    if (!Configuration) {
      console.log('Error: CLI Configuration missing or mis-configured, use `cloudonix-cli config --help` to setup your CLI tool');
      process.exit(-1);
    }

    const {flags} = this.parse(TenantCommand);
    const {args} = this.parse(TenantCommand);
    var result = {};

    /* Validate that we have some form of tenant identifier */
    /*
    if (!TenantModel.setTenantIdent(flags)) {
      console.log('Error: --id=|--name=|--self must be provided when using tenant command');
      process.exit(-1);
    }
    */
    TenantModel.setTenantIdent(flags);

    /* Build the HTTP connector to Cloudonix API endpoint */
    TenantModel.connect();

    /* Run the command */
    switch (args.command) {
      case "get":
        result = await TenantModel.get();
        break;
      case "settings":
        if (typeof flags.addpair != 'undefined') {
          /* Add a new profile key:value pair */
          result = await TenantModel.settingsAttributeSet(flags);
        }
        else if (typeof flags.delpair != 'undefined') {
          /* Del a profile key:value pair */
          result = await TenantModel.settingsAttributeDelete(flags);
        }
        else {
          /* Get tenant profile */
          result = await TenantModel.settingsGet();
        }
        break;
      case "apikey":
        if (typeof flags.generate != 'undefined') {
          /* Generate a new Tenant API key */
          result = await TenantModel.apikeyGenerate(flags);
        }
        else if (typeof flags.revoke != 'undefined') {
          /* Revoke an existing Tenant API key */
          result = await TenantModel.apikeyRevoke(flags);
        } else {
          /* Get tenant API keys */
          result = await TenantModel.apikeyGet(flags);
        }
        break;
    }

    console.json(result);

  }
}

TenantCommand.description = `Manage Cloudonix tenant data model
A tenant represents the highest level of authorization a Cloudonix platform customer can 
have. Tenants maintain multiple sets of domains, applications, trunks, DNIDs and more.

The 'tenant' module enables the tenant administrator to query the tenant configuration
and control various teant related settings.
`;

TenantCommand.usage = "$ cloudonix-cli tenant COMMAND [OPTION] [OPTION] [OPTION]";

TenantCommand.flags = {
  name: flags.string({description: 'Tenant name', exclusive: ['id', 'self']}),
  id: flags.string({description: 'Tenant ID', exclusive: ['name', 'self']}),
  self: flags.boolean({description: '[default] Refer to the tenant indicated by the configured API key', exclusive: ['id', 'name']}),
  generate: flags.string({description: 'Generate a new API key, and set its name'}),
  revoke: flags.string({description: 'Revoke an API key, indicated by its name'}),
  keyid: flags.string({description: 'Get API key information',  exclusive: ['keylist']}),
  keylist: flags.boolean({description: '[default] Get API key list', exclusive: ['keyid']}),
  setpair: flags.string({description: 'Set a tenant settings key:value pair, as designated by `addpair` and `value`'}),
  delpair: flags.string({description: 'Delete a tenant settings key:value pair, as designated by `delkey`'}),
  value: flags.string({description: 'Assign the `value` to the new settings pair, designated by `addpair`',dependsOn: ['addpair']}),
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
  'Add a tenant setting to your tenant\n$ cloudonix-cli tenant settings --addpair=new-key --value=new-value --self\n',
];

module.exports = TenantCommand;
