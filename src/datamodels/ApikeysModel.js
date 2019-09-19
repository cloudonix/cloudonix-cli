/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | datamodels/ApikeysModel.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const CloudonixApi = require('../lib/CloudonixApi').constructor();
const CloudonixCoreDatamodel = require('./CoreModel');
const CurrentDatamodel = 'apikeys';

class ApikeysDatamodel extends CloudonixCoreDatamodel {

  static async get(flags) {
    try {
      this._modelQueryPath = CloudonixApi._apikeys.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);

      var response;
      response = await CloudonixApi._apikeys.get();

      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async create(flags) {
    try {

      this._modelQueryPath = CloudonixApi._apikeys.setTenant(CurrentDatamodel, this._modelTenant, flags.domain, flags.application);
      var response = await CloudonixApi._apikeys.create(flags);

      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async revoke(flags) {
    try {
      this._modelQueryPath = CloudonixApi._apikeys.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);

      var response;
      if (typeof flags.name != 'undefined') {
        response = await CloudonixApi._apikeys.revoke(flags.name);
      } else {
        return {
          status: 500,
          message: 'Missing arguments --name',
        }
      }
      return this.cleanResponse(response);
    }
    catch (error) {
      return error;
    }
  }
}

module.exports = ApikeysDatamodel;

