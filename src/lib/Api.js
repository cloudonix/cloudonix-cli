/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | lib/Api.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const Client = require('../helpers/Client');

class Api {

  static setTenant(datamodel, ident) {

    var result;
    switch (datamodel) {
      case 'tenants':
        result = '/' + datamodel + '/' + ident;
        break;
      default:
        result = '/tenants/' + ident + '/' + datamodel ;
        break;
    }
    this._modelQueryPath = result;
    return result;
  }

  static connect() {
    this._modelHttpConnector = Client.Connect(process.env.APIKEY, process.env.ENDPOINT);
    return this._modelHttpConnector;
  }

}

module.exports = Api;

