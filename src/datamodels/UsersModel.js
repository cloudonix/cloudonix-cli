/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | datamodels/UsersModel.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const CloudonixApi = require('../lib/CloudonixApi').constructor();
const CloudonixCoreDatamodel = require('./CoreModel');
const CurrentDatamodel = 'users';
var InputValidator = require('validator');

class UsersDatamodel extends CloudonixCoreDatamodel {

  static async get(flags) {
    try {
      this._modelQueryPath = CloudonixApi._users.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);

      var response;
      if (typeof flags.username != 'undefined') {
        response = await CloudonixApi._users.get(flags.username);
      } else {
        response = await CloudonixApi._users.get();
      }

      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async create(flags) {
    try {
      this._modelQueryPath = CloudonixApi._users.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);

      if ((typeof flags.username != 'undefined') && (InputValidator.isEmail(flags.username))) {
        flags.email = flags.username;
        delete flags.username;
        delete flags.domain;
      } else {
        return {
          status: 500,
          message: 'Missing arguments --username or provided input is not an email address',
        }
      }

      var response = await CloudonixApi._users.create(flags);

      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async revoke(flags) {
    try {
      this._modelQueryPath = CloudonixApi._users.setTenant(CurrentDatamodel, this._modelTenant, flags.domain);

      if (typeof flags.username == 'undefined') {
        return {
          status: 500,
          message: 'Missing arguments --username or provided input is not an email address',
        }
      }

      var response;
      response = await CloudonixApi._users.revoke(flags.username);
      return this.cleanResponse(response);
    }
    catch (error) {
      return error;
    }
  }
}

module.exports = UsersDatamodel;

