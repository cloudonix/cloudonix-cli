/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | datamodels/DnidsModel.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const CloudonixApi = require('../lib/CloudonixApi').constructor();
const CloudonixCoreDatamodel = require('./CoreModel');
const CurrentDatamodel = 'dnids';

class DnidsDatamodel extends CloudonixCoreDatamodel {

  static async get(flags) {
    try {
      this._modelQueryPath = CloudonixApi._dnids.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);

      var response;
      if (typeof flags.name != 'undefined') {
        response = await CloudonixApi._dnids.get(flags.name);
      } else if (typeof flags.id != 'undefined') {
        response = await CloudonixApi._dnids.get(flags.id);
      } else {
        response = await CloudonixApi._dnids.get();
      }

      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async create(flags) {
    try {

      if (typeof flags.name == 'undefined') {
        return {
          status: 500,
          message: 'Missing arguments --name',
        }
      }

      if (typeof flags.url == 'undefined') {
        return {
          status: 500,
          message: 'Missing arguments --url',
        }
      }

      this._modelQueryPath = CloudonixApi._dnids.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);
      var response = await CloudonixApi._dnids.create(flags);

      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async update(flags) {
    try {
      this._modelQueryPath = CloudonixApi._dnids.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);

      var applicationName;
      if (typeof flags.name != 'undefined') {
        applicationName = flags.name;
      } else if (typeof flags.id != 'undefined') {
        applicationName = flags.id;
      } else {
        return {
          status: 500,
          message: 'Missing arguments --name|--id',
        }
      }

      delete flags.name;
      delete flags.id;

      if (typeof flags.enable != 'undefined') {
        flags.active = true;
        delete flags.enable;
      }
      if (typeof flags.disable != 'undefined') {
        flags.active = false;
        delete flags.disable;
      }
      var response = await CloudonixApi._dnids.update(applicationName, flags);

      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async revoke(flags) {
    try {
      this._modelQueryPath = CloudonixApi._dnids.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);

      var response;
      if (flags.name) {
        response = await CloudonixApi._dnids.revoke(flags.name);
      } else if (flags.id) {
        response = await CloudonixApi._dnids.revoke(flags.id);
      } else {
        return {
          status: 500,
          message: 'Missing arguments --name|--id',
        }
      }

      return this.cleanResponse(response);
    }

    catch (error) {
      return error;
    }
  }

}

module.exports = DnidsDatamodel;
