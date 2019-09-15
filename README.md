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
@nir.simionovich/cloudonix-cli/0.1.1 darwin-x64 node-v11.13.0
$ cloudonix-cli --help [COMMAND]
USAGE
  $ cloudonix-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cloudonix-cli apikeys`](#cloudonix-cli-apikeys)
* [`cloudonix-cli applications COMMAND [OPTIONS]`](#cloudonix-cli-applications-command-options)
* [`cloudonix-cli config COMMAND`](#cloudonix-cli-config-command)
* [`cloudonix-cli dnids`](#cloudonix-cli-dnids)
* [`cloudonix-cli domains COMMAND [OPTIONS]`](#cloudonix-cli-domains-command-options)
* [`cloudonix-cli help [COMMAND]`](#cloudonix-cli-help-command)
* [`cloudonix-cli subscribers`](#cloudonix-cli-subscribers)
* [`cloudonix-cli tenant COMMAND [OPTIONS]`](#cloudonix-cli-tenant-command-options)
* [`cloudonix-cli trunks COMMAND [OPTIONS]`](#cloudonix-cli-trunks-command-options)
* [`cloudonix-cli users`](#cloudonix-cli-users)

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

_See code: [src/commands/apikeys.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.1/src/commands/apikeys.js)_

## `cloudonix-cli applications COMMAND [OPTIONS]`

Manage Cloudonix applications data model

```
USAGE
  $ cloudonix-cli applications COMMAND [OPTIONS]

ARGUMENTS
  COMMAND
      (get|create|update|revoke|wizard) [default: get] Command to execute
    
      get       Get application info or list of
      create    Create application
      update    Update application
      revoke    Delete application
      wizard    Application wizard - connect with verified compatible application providers or create a custom app

OPTIONS
  --disable               Set the application as disabled
  --domain=domain         (required) Domain name or domain ID associated to the application
  --enable                Set the application as enabled
  --id=id                 Application ID
  --name=name             Application name
  --self                  [Default] Refer to the tenant indicated by the configured API key
  --tenant=tenant         Tenant name or ID
  --type=cloudonix|twiml  [default: cloudonix] Application API language
  --url=url               Application remote URL

DESCRIPTION
  An application represents a logic element, implementing one of Cloudonix's Voice or SMS application APIs.

  The 'applications' module enables the tenant administrator to manage the tenants applications.

EXAMPLES
  Get list of applications and their information
  $ cloudonix-cli applications get --domain=mydomain.org

  Get application information
  $ cloudonix-cli applications get --self --domain=mydomain.org --name=my-app-name

  Create an application
  $ cloudonix-cli applications create --self --domain=mydomain.org --name=my-app-name --type=cloudonix 
  --url=https://myurl.com/script

  Revoke an application
  $ cloudonix-cli applications revoke --self --domain=mydomain.org --name=my-app-name
```

_See code: [src/commands/applications.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.1/src/commands/applications.js)_

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

_See code: [src/commands/config.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.1/src/commands/config.js)_

## `cloudonix-cli dnids`

Describe the command here

```
USAGE
  $ cloudonix-cli dnids

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/dnids.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.1/src/commands/dnids.js)_

## `cloudonix-cli domains COMMAND [OPTIONS]`

Manage Cloudonix tenant domains data models

```
USAGE
  $ cloudonix-cli domains COMMAND [OPTIONS]

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

_See code: [src/commands/domains.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.1/src/commands/domains.js)_

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

_See code: [src/commands/subscribers.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.1/src/commands/subscribers.js)_

## `cloudonix-cli tenant COMMAND [OPTIONS]`

Manage Cloudonix tenant data model

```
USAGE
  $ cloudonix-cli tenant COMMAND [OPTIONS]

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

_See code: [src/commands/tenant.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.1/src/commands/tenant.js)_

## `cloudonix-cli trunks COMMAND [OPTIONS]`

Manage Cloudonix trunks data model

```
USAGE
  $ cloudonix-cli trunks COMMAND [OPTIONS]

ARGUMENTS
  COMMAND
      (get|create|update|revoke|wizard) [default: get] Command to execute
    
      get       Get trunk of list of
      create    Create trunk
      update    Update trunk
      revoke    Delete trunk
      wizard    Trunk wizard - connect with verified compatible service providers

OPTIONS
  --direction=inbound|outbound|public-inbound|public-outbound  [Default: public-outbound] Trunk transport

  --domain=domain                                              (required) Domain name or domain ID associated to the
                                                               trunk

  --id=id                                                      Trunk ID

  --ip=ip                                                      Trunk IP address or FQDN

  --name=name                                                  Trunk name

  --port=port                                                  [Default: 5060] Trunk port

  --prefix=prefix                                              Trunk technical prefix

  --self                                                       [default] Refer to the tenant indicated by the configured
                                                               API key

  --tenant=tenant                                              Tenant name or ID

  --transport=udp|tcp|tls                                      [Default: udp] Trunk transport

DESCRIPTION
  A trunk represents a connection from the Cloudonix switching core, to a remotely located 
  communications provider or a remotely located communications system. Trunks are IP connections
  based upon the SIP signalling protocol. Cloudonix trunks support the following voice codecs:
  G711u, G711a, G729, G723, GSM, Speex and Opus. 

  The 'trunks' module enables the tenant administrator to manage the tenants trunks.

EXAMPLES
  Get list of trunks and their information
  $ cloudonix-cli trunks get --domain=mydomain.org

  Get trunk information
  $ cloudonix-cli trunks get --self  --domain=mydomain.org --name=my-trunk-name

  Revoke a trunk
  $ cloudonix-cli trunks revoke --self  --domain=mydomain.org --name=my-trunk-name
```

_See code: [src/commands/trunks.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.1/src/commands/trunks.js)_

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

_See code: [src/commands/users.js](https://github.com/cloudonix/cloudonix-cli/blob/v0.1.1/src/commands/users.js)_
<!-- commandsstop -->
