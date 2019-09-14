/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | datamodels/TenantModel.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const DomainsApi = require('../lib/DomainsApi');

class DomainsDataModel {

  static connect() {
    this._modelHttpConnector = DomainsApi.connect(process.env.APIKEY, process.env.ENDPOINT);
  }

  static setTenantIdent(flags) {
    var result = false;

    if (!result) {
      result = (typeof flags.tenant != "undefined") ? flags.tenant : false;
      DomainsApi.setTenantIdent(result);
    }
    if (!result) {
      result = (typeof flags.self != "undefined") ? 'self' : false;
      DomainsApi.setTenantIdent();
    }

    return result;
  }

  static async get(flags) {
    try {
      var domainName = false;
      if (typeof flags.name != "undefined") {
        domainName = flags.name;
      } else if (typeof flags.id != "undefined") {
        domainName = flags.id;
      }
      var domainAlias = (typeof flags.alias != "undefined") ? flags.alias : false;
      var domainAliases = (typeof flags.aliases != "undefined") ? flags.aliases : false;

      var response = (!domainName) ? await DomainsApi.get() : await DomainsApi.get(domainName);
      return {
        status: response.status,
        message: response.statusText,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.statusText
      };
    }
  }

  static async create(flags) {
    try {
      var domainName = (typeof flags.name != "undefined") ? flags.name : false;
      var response = await DomainsApi.create(domainName);
      return {
        status: response.status,
        message: response.statusText,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.statusText
      };
    }
  }

  static async revoke(flags) {
    try {
      var domainIdent = (typeof flags.name != "undefined") ? flags.name : false;
      var response = await DomainsApi.revoke(domainIdent);
      return {
        status: response.status,
        message: response.statusText,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.statusText
      };
    }
  }

  static async update(flags) {
    try {
      var domainName = (typeof flags.name != "undefined") ? flags.name : false;
      var newDomainName = (typeof flags.newname != "undefined") ? flags.newname : false;
      var response = await DomainsApi.update(domainName, newDomainName);
      return {
        status: response.status,
        message: response.statusText,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.statusText
      };
    }
  }

  static async config(flags) {
    try {

      var configSet = (typeof flags.set != "undefined") ? flags.set : false;
      var configUnset = (typeof flags.unset != "undefined") ? flags.unset : false;

      if (!(configSet ^ configUnset)) {
        return({ status: 500, message: '`config` requires --set or --unset option.' });
      }

      var domainName;
      if (typeof flags.name != "undefined") {
        domainName = flags.name;
      } else if (typeof flags.id != "undefined") {
        domainName = flags.id;
      } else {
        return({ status: 500, message: '`config` requires --name option.' });
      }

      var configObjectSet = {};
      var configObjectUnset = false;
      if (typeof flags.alias != "undefined") {
        configObjectSet.alias = flags.alias;
        configObjectUnset = (configUnset) ? { alias: flags.alias }: false;
      }
      if (typeof flags.regfree != "undefined") {
        configObjectSet.registrationFree = flags.regfree;
        configObjectUnset = (configUnset) ? { registrationFree: false } : false;
      }
      if (typeof flags.active != "undefined") {
        configObjectSet.active = flags.active;
        configObjectUnset = (configUnset) ? { active: false }: false;
      }
      if (typeof flags.app != "undefined") {
        configObjectSet.defaultApplication = flags.app;
        configObjectUnset = (configUnset) ? { defaultApplication: flags.app } : false;
      }
      if (typeof flags.pair != "undefined") {
        configObjectSet.pair = flags.pair;
        configObjectUnset = (configUnset) ? { pair: flags.pair } : false;
      }
      if (typeof flags.value != "undefined") {
        configObjectSet.value = flags.value;
      }

      /* Data Validation */
      if (Object.keys(configObjectSet).length == 0) {
        return({ status: 500, message: 'configuration options missing.' });
      } else if ((Object.keys(configObjectSet).length > 1) && configUnset) {
        return({ status: 500, message: '--unset may be provided with a single configuration option.' });
      } else if ((Object.keys(configObjectSet).length != 1) && configSet && (typeof configObjectSet.alias != "undefined")) {
        return({ status: 500, message: '--alias operation may not be provided with additional options.' });
      } else if (configUnset && (typeof configObjectUnset.defaultApplication != 'undefined')) {
        return({ status: 500, message: 'Un-setting default application denied! Please use --set to reset default application.' });
      }

      var response = {};
      if (configSet) {
        response = await DomainsApi.config(domainName, true, configObjectSet);
      } else {
        response = await DomainsApi.config(domainName, false, configObjectUnset);
      }

      return {
        status: response.status,
        message: response.statusText,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.statusText
      };
    }
  }

}

module.exports = DomainsDataModel;