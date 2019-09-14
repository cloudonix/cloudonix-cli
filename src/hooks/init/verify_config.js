const ConfigHelper = require('../../helpers/Configuration');

module.exports = async function (opts) {

  var Configuration = ConfigHelper.validateConfiguration();
  if (!Configuration) {
    this.error('CLI Configuration missing or mis-configured, use `cloudonix-cli config --help` to setup your CLI tool');
  }

}
