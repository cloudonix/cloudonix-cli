/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | lib/CloudonixApi.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const TenantApi = require('./TenantApi');
const ApplicationsApi = require('./ApplicationsApi');
const DnidsApi = require('./DnidsApi');
const DomainsApi = require('./DomainsApi');
const TrunksApi = require('./TrunksApi');

class CloudonixApi {

  static constructor() {
    this._tenant = TenantApi;
    this._applications = ApplicationsApi;
    this._dnids = DnidsApi;
    this._domains = DomainsApi;
    this._trunks = TrunksApi;
    this._users = false;
    this._subscribers = false;
    return this;
  }

}

module.exports = CloudonixApi;