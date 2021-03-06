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
const SubscribersApi = require('./SubscribersApi');
const ApikeysApi = require('./ApikeysApi');
const UsersApi = require('./UsersApi');

class CloudonixApi {

  static constructor() {
    this._tenant = TenantApi;
    this._applications = ApplicationsApi;
    this._dnids = DnidsApi;
    this._domains = DomainsApi;
    this._trunks = TrunksApi;
    this._subscribers = SubscribersApi;
    this._apikeys = ApikeysApi;
    this._users = UsersApi;
    return this;
  }

}

module.exports = CloudonixApi;
