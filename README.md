@nir.simionovich/cloudonix-cli
==============================

A CLI tool for the Cloudonix API.Core

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@nir.simionovich/cloudonix-cli.svg)](https://npmjs.org/package/@nir.simionovich/cloudonix-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@nir.simionovich/cloudonix-cli.svg)](https://npmjs.org/package/@nir.simionovich/cloudonix-cli)
[![License](https://img.shields.io/npm/l/@nir.simionovich/cloudonix-cli.svg)](https://github.com/cloudonix/cloudonix-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @nir.simionovich/cloudonix-cli
$ cloudonix-cli COMMAND
running command...
$ cloudonix-cli (-v|--version|version)
@nir.simionovich/cloudonix-cli/0.1.0 darwin-x64 node-v11.13.0
$ cloudonix-cli --help [COMMAND]
USAGE
  $ cloudonix-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cloudonix-cli config COMMAND`](#cloudonix-cli-config-command)
* [`cloudonix-cli help [COMMAND]`](#cloudonix-cli-help-command)
* [`cloudonix-cli $ cloudonix-cli tenant COMMAND [OPTION] [OPTION] [OPTION]`](#cloudonix-cli--cloudonix-cli-tenant-command-option-option-option)

## `cloudonix-cli config COMMAND`

Configure the Cloudonix CLI

```
USAGE
  $ cloudonix-cli config COMMAND

ARGUMENTS
  COMMAND  (get|set) [default: get] Command to execute

OPTIONS
  --apikey=apikey  Cloudonix API key
  --sandbox        Enable/Disable sandbox operations
```

_See code: [src/commands/config.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.0/src/commands/config.js)_

## `cloudonix-cli help [COMMAND]`

display help for cloudonix-cli

```
USAGE
  $ cloudonix-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `cloudonix-cli $ cloudonix-cli tenant COMMAND [OPTION] [OPTION] [OPTION]`

Manage Cloudonix tenant data model

```
USAGE
  $ cloudonix-cli $ cloudonix-cli tenant COMMAND [OPTION] [OPTION] [OPTION]

ARGUMENTS
  COMMAND  (get|settings|apikey) [default: get] Command to execute

OPTIONS
  --delpair=delpair    Delete a tenant settings key:value pair, as designated by `delkey`
  --generate=generate  Generate a new API key, and set its name
  --id=id              Tenant ID
  --keyid=keyid        Get API key information
  --keylist            [default] Get API key list
  --name=name          Tenant name
  --revoke=revoke      Revoke an API key, indicated by its name
  --self               [default] Refer to the tenant indicated by the configured API key
  --setpair=setpair    Set a tenant settings key:value pair, as designated by `addpair` and `value`
  --value=value        Assign the `value` to the new settings pair, designated by `addpair`

DESCRIPTION
  A tenant represents the highest level of authorization a Cloudonix platform customer can 
  have. Tenants maintain multiple sets of domains, applications, trunks, DNIDs and more.

  The 'tenant' module enables the tenant administrator to query the tenant configuration
  and control various teant related settings.

EXAMPLES
  Get my tenant information
  $ cloudonix-cli tenant get --self

  List all tenant associated API keys (all types)
  $ cloudonix-cli tenant apikey --getkey --self

  Add a tenant setting to your tenant
  $ cloudonix-cli tenant settings --addpair=new-key --value=new-value --self
```

_See code: [src/commands/tenant.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.0/src/commands/tenant.js)_
<!-- commandsstop -->
