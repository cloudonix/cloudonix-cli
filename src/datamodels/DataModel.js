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

class DataModel {

  static connect() {
    return Api.connect();
  }

  static setTenantIdent(flags) {
    var result = false;

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
    this._modelTenant = result;

    return result;
  }
}

module.exports = DataModel;

