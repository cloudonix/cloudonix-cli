/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | lib/DnidsApi.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const Client = require('../helpers/Client');
const Api = require('./Api');

class DnidsApi extends Api {

  static async get(applicationName) {
    try {
      var queryPath = (typeof applicationName != 'undefined') ? this._modelQueryPath + "/" + applicationName : this._modelQueryPath;
      var response = await this._modelHttpConnector.httpConnector.get(queryPath);
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

  static async create(applicationConfig) {
    try {
      var queryPath = this._modelQueryPath;
      var response = await this._modelHttpConnector.httpConnector.post(queryPath, applicationConfig);
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

  static async update(applicationName, applicationConfig) {
    try {
      var queryPath = this._modelQueryPath + '/' + applicationName;
      var trunkConfigObject = applicationConfig;

      var response = await this._modelHttpConnector.httpConnector.put(queryPath, trunkConfigObject);
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

  static async revoke(applicationName) {
    try {
      var queryPath = this._modelQueryPath + "/" + applicationName;
      var response = await this._modelHttpConnector.httpConnector.delete(queryPath);
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

module.exports = DnidsApi;
