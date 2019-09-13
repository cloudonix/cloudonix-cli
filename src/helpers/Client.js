/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | helpers/Client.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const axios = require('axios');

class AxiosClient {
  /**
   * Cloudonix API.Core REST AxiosClient Object Constructor
   *
   * @param apikey
   * @param endpoint
   * @constructor
   */
  static Connect(apikey = false, endpoint = 'https://api.cloudonix.io') {

    this.apikey = apikey;
    this.httpConfig = {
      baseURL: endpoint,
      timeout: 5000,
      headers: {
        'Authorization': 'Bearer ' + apikey,
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    };

    try {
      this.httpConnector = axios.create(this.httpConfig);
      return this;
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = AxiosClient;
