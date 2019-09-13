/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | helpers/Configuration.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const environmentFilename = '.env.cloudonix.cli';
const endpointProduction = 'https://api.cloudonix.io';
const endpointSandbox = 'https://api.staging.cloudonix.io';

const fs = require('fs');

class ConfigHelper {

  /**
   * @return {boolean}
   */
  static validateConfiguration() {

    if (!fs.existsSync(environmentFilename)) {
      return false;
    }

    const configuration = require('dotenv').config(
      {
        path: environmentFilename
      }
    );

    if (typeof configuration.parsed.ENDPOINT === 'undefined') {
      configuration.parsed.ENDPOINT = endpointProduction;
    }

    if (typeof configuration.parsed.APIKEY === 'undefined') {
      return false;
    }

    return configuration.parsed;
  }

  static setConfiguration(configObject) {
    var environment = "";
    environment += (!configObject['apikey']) ? '' : 'APIKEY=' + configObject['apikey'] + "\n";
    environment += (!configObject['sandbox']) ? 'ENDPOINT=' + endpointProduction : 'ENDPOINT=' + endpointSandbox + "\n";
    fs.writeFileSync(environmentFilename, environment, {mode: 0o644, flag: 'w'});
    return this.validateConfiguration();
  }

  static outputConfiguration(Configuration) {
    console.log("\x1b[31mCloudonix CLI configuration follows:\x1b[0m");
    console.log("\x1b[33mAPIKEY:\x1b[0m " + Configuration.APIKEY);
    console.log("\x1b[33mENDPOINT:\x1b[0m " + Configuration.ENDPOINT);
  }
}

module.exports = ConfigHelper;
