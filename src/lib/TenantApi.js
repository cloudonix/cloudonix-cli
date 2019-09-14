/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | lib/TenantApi.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */
const Client = require('../helpers/Client');
const Api = require('./Api');

class TenantApi extends Api {

  static async get() {
    try {
      var response = await this._modelHttpConnector.httpConnector.get(this._modelQueryPath);
      return {
        status: response.status,
        message: response.statusText,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.statusText,
        data: false
      };
    }
  }

  static async settingsGet() {
    try {
      var response = await this._modelHttpConnector.httpConnector.get(this._modelQueryPath + "/settings");
      return {
        status: response.status,
        message: response.statusText,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.statusText,
        data: false
      };
    }
  }

  static async settingsAttributeSet(key, keyvalue) {
    try {
      var requestJson = { value: keyvalue };

      var response = await this._modelHttpConnector.httpConnector.put(this._modelQueryPath + "/settings/" + key, requestJson);
      return {
        status: response.status,
        message: response.statusText,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.statusText,
        data: false
      };
    }
  }

  static async settingsAttributeDelete(key) {
    try {
      var response = await this._modelHttpConnector.httpConnector.delete(this._modelQueryPath + "/settings/" + key);
      return {
        status: response.status,
        message: response.statusText,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.statusText,
        data: false
      };
    }
  }

  static async apikeyGet(keyid) {
    try {
      var query_string = (keyid) ? "/apikeys/" + keyid : "/apikeys";
      var response = await this._modelHttpConnector.httpConnector.get(this._modelQueryPath + query_string);

      return {
        status: response.status,
        message: response.statusText,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.statusText,
        data: false
      };
    }
  }

  static async apikeyGenerate(keyname) {
    try {
      var query_string = "/apikeys";
      var response = await this._modelHttpConnector.httpConnector.post(this._modelQueryPath + query_string, { name: keyname });

      return {
        status: response.status,
        message: response.statusText,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.statusText,
        data: false
      };
    }
  }

  static async apikeyRevoke(keyid) {
    try {
      var query_string = "/apikeys";
      var response = await this._modelHttpConnector.httpConnector.delete(this._modelQueryPath + query_string + "/" + keyid);

      return {
        status: response.status,
        message: response.statusText,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.statusText,
        data: false
      };
    }
  }

}

module.exports = TenantApi;
