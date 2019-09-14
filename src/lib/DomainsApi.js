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
const ModelQueryTenantPath = '/tenants';
const ModelQueryPath = '/domains';
const Client = require('../helpers/Client');

class DomainsApi {

  static connect(apikey, endpoint) {
    this._modelHttpConnector = Client.Connect(apikey, endpoint);
  }

  static setTenantIdent(ident) {

    var result = (typeof ident != "undefined") ? ModelQueryTenantPath + '/' + ident : ModelQueryTenantPath + '/self';
    this._modelQueryPath = result + ModelQueryPath;
    return this._modelQueryPath;
  }

  static async get(domainName) {
    try {
      var queryPath = (typeof domainName != 'undefined') ? this._modelQueryPath + "/" + domainName : this._modelQueryPath;
      var response = await this._modelHttpConnector.httpConnector.get(queryPath);
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

  static async create(domainName) {
    try {
      var response = await this._modelHttpConnector.httpConnector.post(this._modelQueryPath, {domain: domainName});
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

  static async revoke(domainIdent) {
    try {
      var response = await this._modelHttpConnector.httpConnector.delete(this._modelQueryPath + "/" + domainIdent);
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

  static async update(domainName, newDomainName) {
    try {
      var response = await this._modelHttpConnector.httpConnector.put(this._modelQueryPath + "/" + domainName,
        {domain: newDomainName}
      );
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

  static async config(domainName, configOperation, configObject) {
    try {

      console.log(configObject);

      var queryPath = this._modelQueryPath + "/" + domainName;
      var response;
      if (configOperation) {
        /* Set Operations */

      } else {
        /* Unset Operations */
        switch(Object.keys(configObject)[0]) {
          case "alias":
            response = await this._modelHttpConnector.httpConnector.delete(queryPath + "/aliases/" + configObject.alias);
            break;
          case "active":
            response = await this._modelHttpConnector.httpConnector.put(queryPath, { active: false });
            break;
          case "pair":
            break;
        }
      }

      /*
      var response = await this._modelHttpConnector.httpConnector.put(this._modelQueryPath + "/" + domainName,
        {domain: newDomainName}
      );
      */
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

module.exports = DomainsApi;
