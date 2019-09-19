/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | lib/UsersApi.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const Client = require('../helpers/Client');
const Api = require('./Api');

class UsersApi extends Api {

  static async get(username) {
    try {
      var queryPath = (typeof username != 'undefined') ? this._modelQueryPath + "/" + username : this._modelQueryPath;
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

  static async create(userConfig) {
    try {
      var queryPath = this._modelQueryPath;
      var response = await this._modelHttpConnector.httpConnector.post(queryPath, userConfig);
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

  static async revoke(username) {
    try {
      var queryPath = this._modelQueryPath + "/" + username;
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

module.exports = UsersApi;
