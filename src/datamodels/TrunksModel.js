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

const TrunksApi = require('../lib/TrunksApi');
const DataModel = require('./DataModel');
const CurrentDataModel = 'trunks';

class TrunksDatamodel extends DataModel {

  static async get(flags) {
    try {
      this._modelQueryPath = TrunksApi.setTenant(CurrentDataModel, this._modelTenant, flags.domain);

      var response;
      if (typeof flags.name != 'undefined') {
        response = await TrunksApi.get(flags.name);
      } else if (typeof flags.id != 'undefined') {
        response = await TrunksApi.get(flags.id);
      } else {
        response = await TrunksApi.get();
      }

      return response;
    } catch (error) {
      return error;
    }
  }

  static async create(flags) {
    try {

      if (typeof flags.transport == 'undefined') {
        flags.transport = 'udp';
      }

      if (typeof flags.port == 'undefined') {
        flags.port = 5060;
      }

      if (typeof flags.direction == 'undefined') {
        flags.direction = 'public-outbound';
      }

      if (typeof flags.prefix == 'undefined') {
        flags.prefix = '';
      }

      this._modelQueryPath = TrunksApi.setTenant(CurrentDataModel, this._modelTenant, flags.domain);
      var response = await TrunksApi.create(flags.name, flags);
      return response;
    } catch (error) {
      return error;
    }
  }

  static async update(flags) {
    try {
      this._modelQueryPath = TrunksApi.setTenant(CurrentDataModel, this._modelTenant, flags.domain);

      var trunkName;
      if (typeof flags.name != 'undefined') {
        trunkName = flags.name;
      } else if (typeof flags.id != 'undefined') {
        trunkName = flags.id;
      } else {
        return {
          status: 500,
          message: 'Missing arguments --name|--id',
        }
      }

      delete flags.name;
      delete flags.id;

      var response = await TrunksApi.update(trunkName, flags);
      return response;
    } catch (error) {
      return error;
    }
  }

  static async revoke(flags) {
    try {
      this._modelQueryPath = TrunksApi.setTenant(CurrentDataModel, this._modelTenant, flags.domain);

      var response;
      if (flags.name) {
        response = await TrunksApi.revoke(flags.name);
      } else if (flags.id) {
        response = await TrunksApi.revoke(flags.id);
      } else {
        return {
          status: 500,
          message: 'Missing arguments --name|--id',
        }
      }

      return response;
    }

    catch (error) {
      return error;
    }
  }
}

module.exports = TrunksDatamodel;

