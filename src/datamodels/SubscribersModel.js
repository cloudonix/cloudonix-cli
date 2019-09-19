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
const CurrentDatamodel = 'subscribers';
const passwordGenerator = require('generate-password');

class SubscribersDatamodel extends CloudonixCoreDatamodel {

  static async get(flags) {
    try {
      this._modelQueryPath = CloudonixApi._subscribers.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);

      var response;
      response = await CloudonixApi._subscribers.get();

      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async create(flags) {
    try {

      this._modelQueryPath = CloudonixApi._subscribers.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);

      if (typeof flags.msisdn == 'undefined') {
        return {
          status: 500,
          message: 'Missing arguments --msisdn',
        }
      }

      if (typeof flags.password === 'undefined') {
        flags['sip-password'] = passwordGenerator.generate({length: 32, numbers: true, uppercase: true, symbols: false});
      } else {
        flags['sip-password'] = flags.password;
        delete flags.password;
      }

      if (typeof flags.disable != 'undefined') {
        flags.active = false;
      } else if (typeof flags.enable != 'undefined') {
        flags.active = true;
      }

      var response = await CloudonixApi._subscribers.create(flags);
      delete response.sipPassword;

      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async update(flags) {
    try {
      this._modelQueryPath = CloudonixApi._subscribers.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);

      if (typeof flags.msisdn == 'undefined') {
        return {
          status: 500,
          message: 'Missing arguments --msisdn',
        }
      }

      if (typeof flags.reset !== 'undefined') {
        flags['sip-password'] = passwordGenerator.generate({length: 32, numbers: true, uppercase: true, symbols: false});
        delete flags.reset;
      }

      if (typeof flags.disable != 'undefined') {
        flags.active = false;
        delete flags.disable;
      } else if (typeof flags.enable != 'undefined') {
        flags.active = true;
        delete flags.enable;
      }

      var response = await CloudonixApi._subscribers.update(flags);
      delete response.sipPassword;
      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async revoke(flags) {
    try {
      this._modelQueryPath = CloudonixApi._subscribers.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);

      var response;
      if (typeof flags.msisdn != 'undefined') {
        response = await CloudonixApi._subscribers.revoke(flags.msisdn);
      } else {
        return {
          status: 500,
          message: 'Missing arguments --msisdn',
        }
      }
      return this.cleanResponse(response);
    }
    catch (error) {
      return error;
    }
  }
}

module.exports = SubscribersDatamodel;

