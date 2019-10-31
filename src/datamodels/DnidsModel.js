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
const CloudonixDefaultApplication = 'call-routing';

class DnidsDatamodel extends CloudonixCoreDatamodel {

  static async get(flags) {
    try {

      var response;
      if (typeof flags.dnid != 'undefined') {

        this._modelQueryPath = CloudonixApi._dnids.setManualQuery(
          [{ model: 'domains', value: flags.domain }],
          'application-lookup',
          [{ param: 'search', value: flags.dnid}]
        );

        response = await CloudonixApi._dnids.get();
      } else {
        if (typeof flags.application == 'undefined') {
          flags.application = CloudonixDefaultApplication;
        }

        this._modelQueryPath = CloudonixApi._dnids.setTenant(CurrentDatamodel, this._modelTenant, flags.domain, flags.application);
        response = await CloudonixApi._dnids.get(flags.dnid);
      }

      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async create(flags) {
    try {

      if (typeof flags.dnid == 'undefined') {
        return {
          status: 500,
          message: 'Missing arguments --dnid',
        }
      }

      if (typeof flags.legacy != 'undefined') {
        flags.source = flags.dnid;
        flags.asteriskCompatible = true;
        delete flags.dnid;
        delete flags.legacy;
      } else if (typeof flags.prefix != 'undefined') {
        flags.source = flags.dnid;
        flags.prefix = true;
        delete flags.dnid;
      } else if (typeof flags.expression != 'undefined') {
        flags.source = flags.dnid;
        flags.expression = true;
        delete flags.dnid;
      } else if (typeof flags.global != 'undefined') {
        if (flags.dnid.match(/^[0-9a-z]+$/)) {
          flags.dnid = "^" + flags.dnid + "$";
        }
      }

      if (typeof flags.disable != 'undefined') {
        flags.active = false;
      } else if (typeof flags.enable != 'undefined') {
        flags.active = true;
      }

      if (typeof flags.application == 'undefined') {
        flags.application = CloudonixDefaultApplication;
      }

      this._modelQueryPath = CloudonixApi._dnids.setTenant(CurrentDatamodel, this._modelTenant, flags.domain, flags.application);
      var response = await CloudonixApi._dnids.create(flags);

      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async update(flags) {
    try {

      if (typeof flags.dnid == 'undefined') {
        return {
          status: 500,
          message: 'Missing arguments --dnid',
        }
      }

      if (typeof flags.legacy != 'undefined') {
        flags.source = flags.dnid;
        flags.asteriskCompatible = true;
        delete flags.dnid;
        delete flags.legacy;
      } else if (typeof flags.prefix != 'undefined') {
        flags.source = flags.dnid;
        flags.prefix = true;
        delete flags.dnid;
      } else if (typeof flags.expression != 'undefined') {
        flags.source = flags.dnid;
        flags.expression = true;
        delete flags.dnid;
      } else if (typeof flags.global != 'undefined') {
        if (flags.dnid.match(/^[0-9a-z]+$/)) {
          flags.dnid = "^" + flags.dnid + "$";
        }
      }

      if (typeof flags.disable != 'undefined') {
        flags.active = false;
      } else if (typeof flags.enable != 'undefined') {
        flags.active = true;
      }

      if (typeof flags.application == 'undefined') {
        flags.application = CloudonixDefaultApplication;
      }

      this._modelQueryPath = CloudonixApi._dnids.setTenant(CurrentDatamodel, this._modelTenant, flags.domain, flags.application);

      var response = await CloudonixApi._dnids.update(applicationName, flags);

      return this.cleanResponse(response);
    } catch (error) {
      return error;
    }
  }

  static async revoke(flags) {
    try {
      this._modelQueryPath = CloudonixApi._dnids.setTenant(CurrentDatamodel, this._modelTenant, flags.domain, flags.application);

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
