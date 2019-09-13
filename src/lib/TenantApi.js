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
const ModelQueryPath = '/tenants';
const Client = require('../helpers/Client');

class TenantApi {

  static connect(apikey, endpoint) {
    this._modelHttpConnector = Client.Connect(apikey, endpoint);
  }

  static setTenantIdent(ident) {

    var result = (typeof ident != "undefined") ? ModelQueryPath + '/' + ident : ModelQueryPath + '/self';
    this._modelQueryPath = result;
    return result;
  }

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
        message: error.response.statusText
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
        message: error.response.statusText
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
        message: error.response.statusText
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
        message: error.response.statusText
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
        message: error.response.statusText
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
        message: error.response.statusText
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
        message: error.response.statusText
      };
    }
  }

}

module.exports = TenantApi;
