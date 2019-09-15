/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | datasets/applications.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const applications = [
  {
    name: 'Cloudonix Application 1',
    value: {
      name: 'Cloudonix Application 1',
      vendor: 'Vendor 1',
      vendor_url: 'https://this.is.my.site',
      description: 'Voice Application 1 from vendor 1',
      url: 'https://voice.application/script1.php',
      params: [
        { name: 'param1', value: 'value1'},
        { name: 'param2', value: 'value2'},
      ],
      type: 'cloudonix',
      profile: {},
    }
  },
  {
    name: 'Cloudonix Application 2',
    value: {
      name: 'Cloudonix Application 2',
      vendor: 'Vendor 1',
      vendor_url: 'https://this.is.my.site',
      description: 'Voice Application 2 from vendor 1',
      url: 'https://voice.application/script2.php',
      params: [
        { name: 'param1', value: 'value1'},
        { name: 'param2', value: 'value2'},
      ],
      type: 'cloudonix',
      profile: {},
    }
  },
];

module.exports = applications;
