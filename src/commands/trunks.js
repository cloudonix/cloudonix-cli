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

const sipTrunks = require('../datasets/siptrunks');
const CloudonixModel = require('../datamodels/TrunksModel');
const {Command, flags} = require('@oclif/command');
const inquirer = require('inquirer');
const clearscreen = require('clear');
const prettyjson = require('prettyjson');

class TrunksCommand extends Command {

  async run() {

    const {flags} = this.parse(TrunksCommand);
    const {args} = this.parse(TrunksCommand);
    var result = {};

    CloudonixModel.setTenantIdent(flags, 'trunks');
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
      case "update":
        result = await CloudonixModel.update(flags);
        break;
      case "wizard":
        result = await this.wizard(flags);
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

  async wizard(flags) {
    var menu;
    clearscreen();
    menu = await inquirer.prompt([{
      name: 'configType',
      message: 'Select a SIP configuration wizard',
      type: 'list',
      choices: [{name: 'Custom configuration', value: 'custom'}, {
        name: 'Compatible service providers',
        value: 'template'
      }]
    }]);

    var result;
    switch (menu.configType) {
      case "custom":
        result = await this.wizardCustom(flags);
        break;
      case "template":
        result = await this.wizardTemplate(flags);
        break;
    }

    return result;
  }

  async wizardCustom(flags) {

    var menu;
    var prompt;
    var trunkConfig = {};

    menu = await inquirer.prompt([
      {
        name: 'trunkType',
        message: 'Select trunk direction',
        type: 'list',
        choices: [
          {name: 'Origination (Inbound calls)', value: 'inbound'},
          {name: 'Termination (Outbound calls)', value: 'outbound'}
        ]
      },
      {
        name: 'trunkTransport',
        message: 'Select trunk transport',
        type: 'list',
        choices: [
          {name: 'UDP', value: 'udp', default: true},
          {name: 'TCP', value: 'tcp'},
          {name: 'TLS', value: 'tls'},
        ]
      },
      {
        name: 'trunkAddress',
        message: 'Please enter your SIP trunk IP/FQDN',
        type: 'input'
      },
      {
        name: 'trunkPort',
        message: 'Please enter your SIP trunk port number',
        type: 'input',
        default: 5060
      },
      {
        name: 'trunkPrefix',
        message: 'Please enter a technical prefix',
        type: 'input',
        default: ''
      }]);
    prompt = await inquirer.prompt([
      {
        name: 'trunkName',
        message: 'Please name your trunk',
        type: 'input',
        default: 'trunk-' + menu.trunkAddress + '-' + menu.trunkType
      },
    ]);

    trunkConfig = {
      ip: menu.trunkAddress,
      name: prompt.trunkName,
      port: menu.trunkPort,
      direction: 'public-' + menu.trunkType,
      transport: menu.trunkTransport,
      prefix: menu.trunkPrefix,
      domain: flags.domain
    };

    var confirmMessage = 'We will now create your trunk, using the below information:\n'
      + prettyjson.render(trunkConfig)
      + '\nPlease confirm';

    prompt = await inquirer.prompt([
      {
        name: 'confirm',
        message: confirmMessage,
        type: 'confirm',
        default: false
      },
    ]);

    var result;
    if (prompt.confirm) {
      result = await CloudonixModel.create(trunkConfig);
    } else {
      result = {
        status: 200,
        message: 'Aborted',
        data: 'Operation aborted'
      }
    }

    return result;

  }

  async wizardTemplate(flags) {

    var menu;
    var prompt;
    var trunkConfig = {};

    menu = await inquirer.prompt([{
      name: 'trunkType',
      message: 'Select trunk direction',
      type: 'list',
      choices: [
        {name: 'Origination (Inbound calls)', value: 'inbound'},
        {name: 'Termination (Outbound calls)', value: 'outbound'}
      ]
    }]);
    var trunkType = menu.trunkType;

    menu = await inquirer.prompt([{
      name: 'trunkCarrier',
      message: 'Select trunk carrier',
      type: 'list',
      choices: sipTrunks[trunkType]
    }]);
    var trunkTemplate = menu.trunkCarrier;
    trunkConfig = trunkTemplate;
    trunkConfig.direction = "public-" + trunkType;

    if (trunkTemplate.prefix) {
      prompt = await inquirer.prompt([{
        name: 'trunkPrefix',
        message: 'Please enter your designated trunk prefix',
        type: 'input'
      }]);
      trunkConfig.prefix = prompt.trunkPrefix;
    } else {
      delete trunkConfig.prefix;
    }
    trunkConfig.domain = flags.domain;

    var confirmMessage = 'We will now create your trunk, using the below information:\n'
      + prettyjson.render(trunkConfig)
      + '\nPlease confirm';

    prompt = await inquirer.prompt([
      {
        name: 'confirm',
        message: confirmMessage,
        type: 'confirm',
        default: false
      },
    ]);

    var result;
    if (prompt.confirm) {
      result = await CloudonixModel.create(trunkConfig);
    } else {
      result = {
        status: 200,
        message: 'Aborted',
        data: 'Operation aborted'
      }
    }

    return result;
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
  domain: flags.string({description: '[Default: Environment Variable] Domain name or domain ID associated to the trunk' }),
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
\x1b[33mrevoke\x1b[0m    Delete trunk
\x1b[33mwizard\x1b[0m    Trunk wizard - connect with verified compatible service providers`,

    default: 'get',                     // default value if no arg input
    options: ['get', 'create', 'update', 'revoke', 'wizard'],        // only allow input to be from a discrete set
  }
];

TrunksCommand.examples = [
  'Get list of trunks and their information\n$ cloudonix-cli trunks get --domain=mydomain.org\n',
  'Get trunk information\n$ cloudonix-cli trunks get --self  --domain=mydomain.org --name=my-trunk-name\n',
  'Revoke a trunk\n$ cloudonix-cli trunks revoke --self  --domain=mydomain.org --name=my-trunk-name\n',
];

module.exports = TrunksCommand;
