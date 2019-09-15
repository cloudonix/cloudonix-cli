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

const CloudonixApi = require('../lib/CloudonixApi').constructor();
const CloudonixCoreDatamodel = require('./CoreModel');
const CurrentDatamodel = 'trunks';

class TrunksDatamodel extends CloudonixCoreDatamodel {

  static async get(flags) {
    try {
      this._modelQueryPath = CloudonixApi._trunks.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);

      var response;
      if (typeof flags.name != 'undefined') {
        response = await CloudonixApi._trunks.get(flags.name);
      } else if (typeof flags.id != 'undefined') {
        response = await CloudonixApi._trunks.get(flags.id);
      } else {
        response = await CloudonixApi._trunks.get();
      }

      return this.cleanResponse(response);
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

      this._modelQueryPath = CloudonixApi._trunks.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);
      var response = await CloudonixApi._trunks.create(flags.name, flags);

      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async update(flags) {
    try {
      this._modelQueryPath = CloudonixApi._trunks.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);

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

      var response = await CloudonixApi._trunks.update(trunkName, flags);
      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async revoke(flags) {
    try {
      this._modelQueryPath = CloudonixApi._trunks.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);

      var response;
      if (flags.name) {
        response = await CloudonixApi._trunks.revoke(flags.name);
      } else if (flags.id) {
        response = await CloudonixApi._trunks.revoke(flags.id);
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

module.exports = TrunksDatamodel;

