const ConfigHelper = require('../../helpers/Configuration');

module.exports = async function (opts) {

  var Configuration = ConfigHelper.validateConfiguration();
  if (!Configuration) {
    this.log('CLI Configuration missing or mis-configured, use `cloudonix-cli config [OPTIONS]` to setup your CLI tool\n');
  }

}
