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

class DomainsApi extends Api {

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
        message: error.response.statusText,
        data: false
      };
    }
  }

  static async getByAlias(alias) {
    try {
      var queryPath = this._modelQueryPath + "/alias/" + alias;
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

  static async getAliases(domainName) {
    try {
      var queryPath = this._modelQueryPath + "/" + domainName + "/aliases";
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
        message: error.response.statusText,
        data: false
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
        message: error.response.statusText,
        data: false
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
        message: error.response.statusText,
        data: false
      };
    }
  }

  static async config(domainName, configOperation, configObject) {
    try {


      var queryPath = this._modelQueryPath + "/" + domainName;
      var response;
      switch (Object.keys(configObject)[0]) {
        case "alias":
          if (configOperation) {
            /* Set Operation */

          } else {
            /* Unset Operation */
            response = await this._modelHttpConnector.httpConnector.delete(queryPath + "/aliases/" + configObject.alias);
          }
          break;
        case "active":
          if (configOperation) {
            /* Set Operation */
          } else {
            /* Unset Operation */
            response = await this._modelHttpConnector.httpConnector.put(queryPath, { active: false });
          }
          break;
        case "pair":
          if (configOperation) {
            /* Set Operation */
          } else {
            /* Unset Operation */
          }
          break;
      }

      /*
       if (configOperation) {

       } else {
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
       */

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
        message: error.response.statusText,
        data: false
      };
    }
  }

}

module.exports = DomainsApi;
