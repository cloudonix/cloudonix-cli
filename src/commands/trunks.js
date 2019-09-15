/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | trunks.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const prettyjson = require('prettyjson');
const CloudonixModel = require('../datamodels/TrunksModel');
const {Command, flags} = require('@oclif/command');

class TrunksCommand extends Command {

  async run() {

    const {flags} = this.parse(TrunksCommand);
    const {args} = this.parse(TrunksCommand);
    var result = {};

    CloudonixModel.setTenantIdent(flags, 'trunks');
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

TrunksCommand.description = `Manage Cloudonix trunks data model
A trunk represents a connection from the Cloudonix switching core, to a remotely located 
communications provider or a remotely located communications system. Trunks are IP connections
based upon the SIP signalling protocol. Cloudonix trunks support the following voice codecs:
G711u, G711a, G729, G723, GSM, Speex and Opus. 

The 'trunks' module enables the tenant administrator to manage the tenants trunks.
`;

TrunksCommand.usage = "trunks COMMAND [OPTIONS]";

TrunksCommand.flags = {
  tenant: flags.string({description: 'Tenant name or ID', exclusive: ['self']}),
  self: flags.boolean({
    description: '[default] Refer to the tenant indicated by the configured API key',
    exclusive: ['tenant']
  }),
  domain: flags.string({description: 'Domain name or domain ID associated to the trunk', required: true}),
  name: flags.string({description: 'Trunk name'}),
  id: flags.integer({description: 'Trunk ID'}),
  ip: flags.string({description: 'Trunk IP address or FQDN'}),
  port: flags.integer({description: '[Default: 5060] Trunk port'}),
  transport: flags.string({
    description: '[Default: udp] Trunk transport',
    options: ['udp', 'tcp', 'tls']
  }),
  direction: flags.string({
    description: '[Default: public-outbound] Trunk transport',
    options: ['inbound', 'outbound', 'public-inbound', 'public-outbound']
  }),
  prefix: flags.string({description: 'Trunk technical prefix'}),
};

TrunksCommand.args = [
  {
    name: 'command',
    required: true,                     // make the arg required with `required: true`
    description: `Command to execute
    
\x1b[33mget\x1b[0m       Get trunk of list of
\x1b[33mcreate\x1b[0m    Create trunk
\x1b[33mupdate\x1b[0m    Update trunk
\x1b[33mrevoke\x1b[0m    Delete trunk`,  // help description
    default: 'get',                     // default value if no arg input
    options: ['get', 'create', 'update', 'revoke'],        // only allow input to be from a discrete set
  }
];

TrunksCommand.examples = [
  'Get list of trunks and their information\n$ cloudonix-cli trunks get --domain=mydomain.org\n',
  'Get trunk information\n$ cloudonix-cli trunks get --self  --domain=mydomain.org --name=my-trunk-name\n',
  'Revoke a trunk\n$ cloudonix-cli trunks revoke --self  --domain=mydomain.org --name=my-trunk-name\n',
];

module.exports = TrunksCommand;
