/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | datasets/siptrunks.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

const sipTrunks = {
  outbound: [
    {
      name: 'VoiceTel',
      value: {
        name: 'VoiceTel',
        ip: '127.0.0.1',
        transport: 'udp',
        port: 5060,
        prefix: true,
      }
    },
    {
      name: 'VoiceTrading',
      value: {
        name: 'VoiceTrading',
        ip: '127.0.0.2',
        transport: 'udp',
        port: 5060,
        prefix: true,
      }
    },
    {
      name: 'Bandwidth.com',
      value: {
        name: 'Bandwidth.com',
        ip: '127.0.0.3',
        transport: 'udp',
        port: 5060,
        prefix: false,
      }
    },
  ],
  inbound: [
    {
      name: 'VoiceTel',
      value: {
        ip: '127.0.0.1',
        name: 'VoiceTel',
        transport: 'udp',
        port: 5060,
        prefix: true,
      }
    },
    {
      name: 'DIDWW',
      value: {
        name: 'DIDWW',
        ip: '127.0.0.2',
        transport: 'udp',
        port: 5060,
        prefix: true,
      }
    },
    {
      name: 'Voxbone',
      value: {
        name: 'Voxbone',
        ip: '127.0.0.3',
        transport: 'udp',
        port: 5060,
        prefix: false,
      }
    }
  ]
};

module.exports = sipTrunks;
