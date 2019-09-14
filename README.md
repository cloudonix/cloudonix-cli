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
* [`cloudonix-cli apikeys COMMAND`](#cloudonix-cli-apikeys-commnand)
* [`cloudonix-cli applications COMMAND`](#cloudonix-cli-applications-commnand)
* [`cloudonix-cli config COMMAND`](#cloudonix-cli-config-command)
* [`cloudonix-cli dnid COMMAND`](#cloudonix-cli-dnid-commnand)
* [`cloudonix-cli domains COMMAND`](#cloudonix-cli-domains-action)
* [`cloudonix-cli help COMMAND`](#cloudonix-cli-help-command)
* [`cloudonix-cli subscribers COMMAND`](#cloudonix-cli-subscribers-commnand)
* [`cloudonix-cli tenant COMMAND`](#cloudonix-cli-tenant-commnand)
* [`cloudonix-cli trunks COMMAND`](#cloudonix-cli-trunks-commnand)
* [`cloudonix-cli users COMMAND`](#cloudonix-cli-users-commnand)

## `cloudonix-cli apikeys`

Describe the command here

```
USAGE
  $ cloudonix-cli apikeys

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/apikeys.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.0/src/commands/apikeys.js)_

## `cloudonix-cli applications`

Describe the command here

```
USAGE
  $ cloudonix-cli applications

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/applications.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.0/src/commands/applications.js)_

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

## `cloudonix-cli dnid`

Describe the command here

```
USAGE
  $ cloudonix-cli dnid

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/dnid.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.0/src/commands/dnid.js)_

## `cloudonix-cli [31mdomains[0m [33m<ACTION>[0m [OPTIONS]`

Manage Cloudonix tenant domains data models

```
USAGE
  $ cloudonix-cli domains <ACTION> [OPTIONS]

ARGUMENTS
  ACTION
      (get|config|create|update|revoke) [default: get] Command to execute
    
      get       Get domain or list all
      create    Create domain
      update    Update domain
      revoke    Delete domain
      config    Manipulate domain settings

OPTIONS
  --active           Set the domain as Active or Inactive (used with `config` action)

  --alias=alias      Set or unset a domain alias for domain (used with `config` action) or get domain by alias (used
                     with `get` action)

  --aliases          Get list of domain aliases (used with `get` action)

  --app=app          Set the domain default application ID (used with `config` action)

  --id=id            Domain ID, aka: namespace ID

  --name=name        Domain name, aka: namespace

  --newname=newname  Rename --name to --newname (used with `update` action)

  --pair=pair        Set a domain profile key:value pair, as designated by `pair` and `value` (used with `config`
                     action)

  --regfree          Set the domain as RegistrationFree enabled or disabled (used with `config` action)

  --self             [default] Refer to the tenant indicated by the configured API key

  --set              Set alias or key:value pair (used with `config` action)

  --tenant=tenant    Tenant name or id

  --unset            Unset alias or key:value pair (used with `config` action)

  --value=value      Assign the `value` to the new profile key:value pair, designated by `pair` (used with `config`
                     action)

DESCRIPTION
  A Cloudonix Tenant may have multiple domains associated with it. While a single tenant may 
  have multiple domains, communications or inter-domain data sharing is not available. Domains
  are treated as discrete logical elments. Domains may have applications, DNIDs, trunks and 
  subscribers associated to them.

EXAMPLES
  Get list of domains and their information
  $ cloudonix-cli domains get

  Get domain information
  $ cloudonix-cli domains get --name=mydomain.cloudonix.io

  Set a domain alias
  $ cloudonix-cli domains config --name=mydomain.cloudonix.io --set --alias=alias.cloudonix.io

  Disable a domain
  $ cloudonix-cli domains config --name=mydomain.cloudonix.io --unset --active
```

_See code: [src/commands/domains.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.0/src/commands/domains.js)_

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

## `cloudonix-cli subscribers`

Describe the command here

```
USAGE
  $ cloudonix-cli subscribers

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/subscribers.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.0/src/commands/subscribers.js)_

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

## `cloudonix-cli trunks`

Describe the command here

```
USAGE
  $ cloudonix-cli trunks

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/trunks.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.0/src/commands/trunks.js)_

## `cloudonix-cli users`

Describe the command here

```
USAGE
  $ cloudonix-cli users

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/users.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.0/src/commands/users.js)_
<!-- commandsstop -->
