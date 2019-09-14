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

const TenantApi = require('../lib/TenantApi');
const DataModel = require('./DataModel');
const CurrentDataModel = 'tenants';

class TenantDatamodel extends DataModel {

  static async get() {
    try {
      this._modelQueryPath = TenantApi.setTenant(CurrentDataModel, this._modelTenant);
      var response = await TenantApi.get();
      return response;
    } catch (error) {
      return error;
    }
  }

  static async settingsGet() {
    try {
      this._modelQueryPath = TenantApi.setTenant(CurrentDataModel, this._modelTenant);
      var response = await TenantApi.settingsGet();
      return response;
    } catch (error) {
      return error;
    }
  }

  static async settingsAttributeSet(flags) {
    try {
      this._modelQueryPath = TenantApi.setTenant(CurrentDataModel, this._modelTenant);
      var attributeKeyName = (typeof flags.setpair != "undefined") ? flags.setpair : false;
      var attirbuteKeyValue = (typeof flags.value != "undefined") ? flags.value : false;

      if ((!attributeKeyName) || (!attirbuteKeyValue)) {
        return({ status: 500, message: 'Both --setpair= and --value= must be provided' });
      }

      var response = await TenantApi.settingsAttributeSet(attributeKeyName, attirbuteKeyValue);
      return response;
    } catch (error) {
      return error;
    }
  }

  static async settingsAttributeDelete(flags) {
    try {
      this._modelQueryPath = TenantApi.setTenant(CurrentDataModel, this._modelTenant);
      var attributeKeyName = (typeof flags.delpair != "undefined") ? flags.delpair : false;

      var response = await TenantApi.settingsAttributeDelete(attributeKeyName);
      return response;
    } catch (error) {
      return error;
    }
  }

  static async apikeyGet(flags) {
    try {
      this._modelQueryPath = TenantApi.setTenant(CurrentDataModel, this._modelTenant);
      var apikeyId = (typeof flags.keyid != "undefined") ? flags.keyid : false;
      var response = await TenantApi.apikeyGet(apikeyId);

      return response;
    } catch (error) {
      return error;
    }
  }

  static async apikeyGenerate(flags) {
    try {
      this._modelQueryPath = TenantApi.setTenant(CurrentDataModel, this._modelTenant);
      var apikeyName = (typeof flags.generate != "undefined") ? flags.generate : false;
      if (!apikeyName) {
        return({ status: 500, message: '--generate= must include a string value' });
      }

      var response = await TenantApi.apikeyGenerate(apikeyName);

      return response;
    } catch (error) {
      return error;
    }
  }

  static async apikeyRevoke(flags) {
    try {
      this._modelQueryPath = TenantApi.setTenant(CurrentDataModel, this._modelTenant);
      var apikeyId = (typeof flags.revoke != "undefined") ? flags.revoke : false;
      if (!apikeyId) {
        return({ status: 500, message: '--revoke= must include an integer value' });
      }

      var response = await TenantApi.apikeyRevoke(apikeyId);

      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = TenantDatamodel;
