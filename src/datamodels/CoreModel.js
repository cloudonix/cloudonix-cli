/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | datamodels/DataModel.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const Api = require('../lib/Api');

class CloudonixCoreDatamodel {

  static connect() {
    return Api.connect();
  }

  static setTenantIdent(flags, datamodel = 'none') {
    var result = false;

    switch (datamodel) {
      case "tenants":
        if (!result) {
          result = (typeof flags.id != "undefined") ? flags.id : false;
        }
        if (!result) {
          result = (typeof flags.name != "undefined") ? flags.name : false;
        }
        if (!result) {
          result = (typeof flags.tenant != "undefined") ? flags.tenant : false;
        }
        if (!result) {
          result = 'self';
        }
        break;
      default:
        if (!result) {
          result = (typeof flags.tenant != "undefined") ? flags.tenant : false;
        }
        if (!result) {
          result = 'self';
        }
        break;
    }

    this._modelTenant = result;
    return result;
  }

  static cleanResponse(response) {
    if (typeof response.data.length != 'undefined') {
      Object.keys(response.data).forEach(function (dataObject) {
        delete response.data[dataObject].domain;
      });
    } else {
      delete response.data.domain;
    }
    return response;
  }

}

module.exports = CloudonixCoreDatamodel;

