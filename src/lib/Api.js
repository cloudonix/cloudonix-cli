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

  static setTenant(datamodel, ident, domain = false, application = false) {

    var result;
    result = '/tenants/' + ident;
    result = result.concat((domain) ? '/domains/' + domain : '');
    result = result.concat('/' + datamodel);

    switch (datamodel) {
      case 'apikeys':
        if ((typeof application != 'undefined') && (application)) {
          result = '/tenants/' + ident;
          result = result.concat((domain) ? '/domains/' + domain : '');
          result = result.concat((application) ? '/applications/' + application : '');
          result = result.concat('/' + datamodel);
        }
        break;
      case 'tenants':
        result = '/' + datamodel + '/' + ident;
        break;
      case 'dnids':
        result = '/tenants/' + ident;
        result = result.concat('/domains/' + domain);
        result = result.concat('/applications/' + application);
        result = result.concat('/' + datamodel);
        break;
      default:
        break;
    }
    this._modelQueryPath = result;
    return result;
  }

  /**
   * Set a manual query path and query parameters
   *
   * @param datamodels array    Array of objects of { model: 'modelName', value: 'assigned model value' }
   * @param query      string   String representing the query to execute
   * @param parameters array    Array of objects of { param: 'queryParam', value: 'queryParamValue' }
   */
  static setManualQuery(datamodels, query, parameters) {

    var result = '';

    datamodels.forEach(function (datamodelObject) {
      var modelName = datamodelObject.model;
      var modelValue = datamodelObject.value;
      result = result + '/' + modelName + '/' + modelValue;
    });

    result = result + '/' + query + '?';

    parameters.forEach(function (paramObject) {
      var paramName = paramObject.param;
      var paramValue = paramObject.value;
      result = result + paramName + '=' + paramValue + '&';
    });

    this._modelQueryPath = result;
    return result;
  }

  static connect() {
    this._modelHttpConnector = Client.Connect(process.env.APIKEY, process.env.ENDPOINT);
    return this._modelHttpConnector;
  }

}

module.exports = Api;

