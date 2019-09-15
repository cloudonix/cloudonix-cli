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

const CloudonixApi = require('../lib/CloudonixApi').constructor();
const CloudonixCoreDatamodel = require('./CoreModel');
const CurrentDatamodel = 'domains';

class DomainsDataModel extends CloudonixCoreDatamodel {

  static async get(flags) {
    try {
      this._modelQueryPath = CloudonixApi._domains.setTenant(CurrentDatamodel, this._modelTenant);
      var domainName = false;
      if (typeof flags.name != "undefined") {
        domainName = flags.name;
      } else if (typeof flags.id != "undefined") {
        domainName = flags.id;
      }
      var domainAlias = (typeof flags.alias != "undefined") ? flags.alias : false;
      var domainAliases = (typeof flags.aliases != "undefined") ? flags.aliases : false;

      var response = (!domainName) ? await CloudonixApi._domains.get() : await CloudonixApi._domains.get(domainName);

      return response;
    } catch (error) {
      return error;
    }
  }

  static async create(flags) {
    try {
      this._modelQueryPath = CloudonixApi._domains.setTenant(CurrentDatamodel, this._modelTenant);
      var domainName = (typeof flags.name != "undefined") ? flags.name : false;
      var response = await CloudonixApi._domains.create(domainName);

      return response;
    } catch (error) {
      return error;
    }
  }

  static async revoke(flags) {
    try {
      this._modelQueryPath = CloudonixApi._domains.setTenant(CurrentDatamodel, this._modelTenant);
      var domainIdent = (typeof flags.name != "undefined") ? flags.name : false;
      var response = await CloudonixApi._domains.revoke(domainIdent);

      return response;
    } catch (error) {
      return error;
    }
  }

  static async update(flags) {
    try {
      this._modelQueryPath = CloudonixApi._domains.setTenant(CurrentDatamodel, this._modelTenant);
      var domainName = (typeof flags.name != "undefined") ? flags.name : false;
      var newDomainName = (typeof flags.newname != "undefined") ? flags.newname : false;
      var response = await CloudonixApi._domains.update(domainName, newDomainName);

      return response;
    } catch (error) {
      return error;
    }
  }

  static async config(flags) {
    try {
      this._modelQueryPath = CloudonixApi._domains.setTenant(CurrentDatamodel, this._modelTenant);
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
        response = await CloudonixApi._domains.config(domainName, true, configObjectSet);
      } else {
        response = await CloudonixApi._domains.config(domainName, false, configObjectUnset);
      }

      return response;
    } catch (error) {
      return error;
    }
  }

}

module.exports = DomainsDataModel;
