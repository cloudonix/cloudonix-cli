/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | lib/DomainsApi.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const Client = require('../helpers/Client');
const Api = require('./Api');

class SubscribersApi extends Api {

  static async get(subscriberIdent) {
    try {
      var queryPath = (typeof subscriberIdent != 'undefined') ? this._modelQueryPath + "/" + subscriberIdent : this._modelQueryPath;
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

  static async create(subscriberObject) {
    try {
      var queryPath = this._modelQueryPath;
      var response = await this._modelHttpConnector.httpConnector.post(queryPath, subscriberObject);
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

  static async update(subscriberObject) {
    try {
      var queryPath = this._modelQueryPath + '/' + subscriberObject.msisdn;

      delete subscriberObject.msisdn;
      delete subscriberObject.domain;

      var response = await this._modelHttpConnector.httpConnector.put(queryPath, subscriberObject);
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

  static async revoke(msisdn) {
    try {
      var queryPath = this._modelQueryPath + "/msisdn/" + msisdn;
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

module.exports = SubscribersApi;
