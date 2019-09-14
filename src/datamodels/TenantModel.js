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

class TenantDatamodel {

  static connect() {
    this._modelHttpConnector = TenantApi.connect(process.env.APIKEY, process.env.ENDPOINT);
  }

  static setTenantIdent(flags) {
    var result = false;

    if (!result) {
      result = (typeof flags.id != "undefined") ? flags.id : false;
      TenantApi.setTenantIdent(result);
    }
    if (!result) {
      result = (typeof flags.name != "undefined") ? flags.name : false;
      TenantApi.setTenantIdent(result);
    }
    if (!result) {
      result = (typeof flags.self != "undefined") ? 'self' : false;
      TenantApi.setTenantIdent();
    }

    return result;
  }

  static async get() {
    try {
      var response = await TenantApi.get();
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

  static async settingsGet() {
    try {
      var response = await TenantApi.settingsGet();
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

  static async settingsAttributeSet(flags) {
    try {
      var attributeKeyName = (typeof flags.setpair != "undefined") ? flags.setpair : false;
      var attirbuteKeyValue = (typeof flags.value != "undefined") ? flags.value : false;

      if ((!attributeKeyName) || (!attirbuteKeyValue)) {
        return('Error: Both --setpair= and --value= must be provided');
      }

      var response = await TenantApi.settingsAttributeSet(attributeKeyName, attirbuteKeyValue);
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

  static async settingsAttributeDelete(flags) {
    try {
      var attributeKeyName = (typeof flags.delpair != "undefined") ? flags.delpair : false;

      var response = await TenantApi.settingsAttributeDelete(attributeKeyName);
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

  static async apikeyGet(flags) {
    try {
      var apikeyId = (typeof flags.keyid != "undefined") ? flags.keyid : false;
      var response = await TenantApi.apikeyGet(apikeyId);

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

  static async apikeyGenerate(flags) {
    try {
      var apikeyName = (typeof flags.generate != "undefined") ? flags.generate : false;
      if (!apikeyName) {
        return('Error: --generate= must include a string value');
      }

      var response = await TenantApi.apikeyGenerate(apikeyName);

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

  static async apikeyRevoke(flags) {
    try {
      var apikeyId = (typeof flags.revoke != "undefined") ? flags.revoke : false;
      if (!apikeyId) {
        return('Error: --revoke= must include an integer value');
      }

      var response = await TenantApi.apikeyRevoke(apikeyId);

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

module.exports = TenantDatamodel;
