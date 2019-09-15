/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | datamodels/tenant.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const CloudonixApi = require('../lib/CloudonixApi').constructor();
const CloudonixCoreDatamodel = require('./CoreModel');
const CurrentDatamodel = 'tenants';

class TenantDatamodel extends CloudonixCoreDatamodel {

  static async get() {
    try {
      this._modelQueryPath = CloudonixApi._tenant.setTenant(CurrentDatamodel, this._modelTenant);
      var response = await CloudonixApi._tenant.get();
      return response;
    } catch (error) {
      return error;
    }
  }

  static async settingsGet() {
    try {
      this._modelQueryPath = CloudonixApi._tenant.setTenant(CurrentDatamodel, this._modelTenant);
      var response = await CloudonixApi._tenant.settingsGet();
      return response;
    } catch (error) {
      return error;
    }
  }

  static async settingsAttributeSet(flags) {
    try {
      this._modelQueryPath = CloudonixApi._tenant.setTenant(CurrentDatamodel, this._modelTenant);
      var attributeKeyName = (typeof flags.setpair != "undefined") ? flags.setpair : false;
      var attirbuteKeyValue = (typeof flags.value != "undefined") ? flags.value : false;

      if ((!attributeKeyName) || (!attirbuteKeyValue)) {
        return({ status: 500, message: 'Both --setpair= and --value= must be provided' });
      }

      var response = await CloudonixApi._tenant.settingsAttributeSet(attributeKeyName, attirbuteKeyValue);
      return response;
    } catch (error) {
      return error;
    }
  }

  static async settingsAttributeDelete(flags) {
    try {
      this._modelQueryPath = CloudonixApi._tenant.setTenant(CurrentDatamodel, this._modelTenant);
      var attributeKeyName = (typeof flags.delpair != "undefined") ? flags.delpair : false;

      var response = await CloudonixApi._tenant.settingsAttributeDelete(attributeKeyName);
      return response;
    } catch (error) {
      return error;
    }
  }

  static async apikeyGet(flags) {
    try {
      this._modelQueryPath = CloudonixApi._tenant.setTenant(CurrentDatamodel, this._modelTenant);
      var apikeyId = (typeof flags.keyid != "undefined") ? flags.keyid : false;
      var response = await CloudonixApi._tenant.apikeyGet(apikeyId);

      return response;
    } catch (error) {
      return error;
    }
  }

  static async apikeyGenerate(flags) {
    try {
      this._modelQueryPath = CloudonixApi._tenant.setTenant(CurrentDatamodel, this._modelTenant);
      var apikeyName = (typeof flags.generate != "undefined") ? flags.generate : false;
      if (!apikeyName) {
        return({ status: 500, message: '--generate= must include a string value' });
      }

      var response = await CloudonixApi._tenant.apikeyGenerate(apikeyName);

      return response;
    } catch (error) {
      return error;
    }
  }

  static async apikeyRevoke(flags) {
    try {
      this._modelQueryPath = CloudonixApi._tenant.setTenant(CurrentDatamodel, this._modelTenant);
      var apikeyId = (typeof flags.revoke != "undefined") ? flags.revoke : false;
      if (!apikeyId) {
        return({ status: 500, message: '--revoke= must include an integer value' });
      }

      var response = await CloudonixApi._tenant.apikeyRevoke(apikeyId);

      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = TenantDatamodel;
