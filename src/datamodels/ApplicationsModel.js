/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | datamodels/trunks.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const ApplicationsApi = require('../lib/ApplicationsApi');
const DataModel = require('./DataModel');
const CurrentDataModel = 'applications';

class ApplicationsDatamodel extends DataModel {

  static async get(flags) {
    try {
      this._modelQueryPath = ApplicationsApi.setTenant(CurrentDataModel, this._modelTenant, flags.domain);

      var response;
      if (typeof flags.name != 'undefined') {
        response = await ApplicationsApi.get(flags.name);
      } else if (typeof flags.id != 'undefined') {
        response = await ApplicationsApi.get(flags.id);
      } else {
        response = await ApplicationsApi.get();
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

      this._modelQueryPath = ApplicationsApi.setTenant(CurrentDataModel, this._modelTenant, flags.domain);
      var response = await ApplicationsApi.create(flags);

      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async update(flags) {
    try {
      this._modelQueryPath = ApplicationsApi.setTenant(CurrentDataModel, this._modelTenant, flags.domain);

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
      var response = await ApplicationsApi.update(applicationName, flags);

      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async revoke(flags) {
    try {
      this._modelQueryPath = ApplicationsApi.setTenant(CurrentDataModel, this._modelTenant, flags.domain);

      var response;
      if (flags.name) {
        response = await ApplicationsApi.revoke(flags.name);
      } else if (flags.id) {
        response = await ApplicationsApi.revoke(flags.id);
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

module.exports = ApplicationsDatamodel;
