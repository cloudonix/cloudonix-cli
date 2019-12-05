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
    description: '[default] Refer to the tenant indicated by the configured API key',
    exclusive: ['tenant']
  }),
  name: flags.string({description: 'Domain name, aka: namespace'}),
  id: flags.integer({description: 'Domain ID, aka: namespace ID'}),
  aliases: flags.boolean({description: 'Get list of domain aliases (used with `get` action)'}),

  // Update flags
  rename: flags.string({description: 'Rename --name to --rename (used with `update` action)'}),

  // Config flags
  active: flags.boolean({description: 'Set the domain as Active or Inactive (used with `config` action)'}),
  app: flags.integer({description: 'Set the domain default application ID (used with `config` action)'}),
  'set': flags.boolean({description: 'Set alias or profile key:value pair (used with `config` action)', exclusive: ['unset']}),
  unset: flags.boolean({description: 'Unset alias or profile key:value pair (used with `config` action)', exclusive: ['set']}),
  alias: flags.string({description: 'Set or unset a domain alias for domain (used with `config` action) or get domain by alias (used with `get` action)'}),
  calltimeout: flags.integer({description: 'Set default call timeout for a call in this domain, unless overridden  for a session, in seconds. Default: 60'}),
  regfree: flags.boolean({description: 'Set the domain as RegistrationFree enabled or disabled (used with `config` action)'}),
  regfreeurl: flags.string({description: 'A URL to receive Registration-Free™ incoming call notifications (used with `config` action)'}),
  regfreekey: flags.string({description: 'An API key to be sent to the Registration-Free™ control end-point as an authorization bearer token (used with `config` action).'}),
  borderallow: flags.boolean({description: 'Whether to allow calls from inbound trunks to be dialed back out through an outbound trunk (used with `config` action). Default: false'}),
  borderfallthrough: flags.boolean({description: 'Allow calls with no LCR plan to be routed by-default through an outbound trunk (if the destination is not a subscriber) (used with `config` action). Default: true'}),
  autoprogrss: flags.boolean({description: 'Automatically send SIP 183 status ("PROGRESS") when a call is received by Cloudonix (used with `config` action). Default: true'}),
  sessionurl: flags.string({description: 'A URL to receive session update notifications. This URL will be used, unless a session update URL had been specified (used with `config` action).'}),
  lcrurl: flags.string({description: 'An endpoint to query for least cost routing configuration  for outbound calls. If set, this URL will be queried, using the Cloudonix LCR protocol, to generate an LCR plan for such outbound calls (used with `config` action).'}),
  trustdisplayname: flags.boolean({description: 'Whether to pass the unauthenticated display name provided by the caller, to the receiver, when the voice application did not set a callerName attribute on the Dial command (used with `config` action). Default: true'}),
  trustsubscriberkey: flags.boolean({description: 'Whether a subscriber can issue an API call to create a new sessions (authorize a call) with a subscriber API key (used with `config` action). Default true.'}),
};

DomainsCommand.args = [
  {
    name: 'action',
    required: true,                     // make the arg required with `required: true`
    description: `Command to execute
    
\x1b[33mget\x1b[0m       Get domain or list all
\x1b[33mcreate\x1b[0m    Create domain
\x1b[33mupdate\x1b[0m    Update domain
\x1b[33mrevoke\x1b[0m    Revoke domain
\x1b[33mconfig\x1b[0m    Manipulate domain settings`,  // help description
    default: 'get',                     // default value if no arg input
    options: ['get', 'config', 'create', 'update', 'revoke'],        // only allow input to be from a discrete set
  }
];

DomainsCommand.examples = [
  'Get list of domains and their information\n $ cloudonix-cli domains get\n',
  'Get domain information\n $ cloudonix-cli domains get --name=mydomain.cloudonix.io\n',
  'Set a domain alias\n $ cloudonix-cli domains config --name=mydomain.cloudonix.io --set \\\n --alias=alias.cloudonix.io\n',
  'Disable a domain\n $ cloudonix-cli domains config --name=mydomain.cloudonix.io --unset \\\n --active\n',
];

module.exports = DomainsCommand;
