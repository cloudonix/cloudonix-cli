/**
 *  ██████╗██╗      ██████╗ ██╗   ██╗██████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗
 * ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╔═══██╗████╗  ██║██║╚██╗██╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██╔██╗ ██║██║ ╚███╔╝
 * ██║     ██║     ██║   ██║██║   ██║██║  ██║██║   ██║██║╚██╗██║██║ ██╔██╗
 * ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║██║██╔╝ ██╗
 *  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
 *
 * Project: cloudonix-cli | cli_help.js
 * Creator: Nir Simionovich <nirs@cloudonix.io> | 2019-08-27
 */

module.exports = {
  help_tenant: function () {
    console.log("");
    console.log("Usage: cloudonix-cli \x1b[36m--tenant \x1b[32m<command> \x1b[33m<parameters>\x1b[0m");
    console.log("");
    console.log("Where \x1b[32m<command>\x1b[0m is one of the following:");
    console.log("  --get       Get a tenants datamodel object");
    console.log("  --update    Update a tenants profile datamodel object");
    console.log("  --genkey    Generate a new Tenant API key and set its name as --keyname");
    console.log("  --delkey    Delete an API key with the name --keyname");
    console.log("  --help      Display additional information about a specific datamodel command");
    console.log("");
    console.log("Where \x1b[33m<parameters>\x1b[0m may be one (or more) of the following:");
    console.log("");
    console.log("  \x1b[33mMandatory\x1b[0m:");
    console.log("  --id <number> | --id=<number>            Numeric tenant ID number, or");
    console.log("  --name <string> | --name=<string>        A string value to identify the tenant, or");
    console.log("  --self                                   Set tenant ID to the one associated with the API key [default]")
    console.log("");
    console.log("  \x1b[33m--update\x1b[0m:");
    console.log("  --pkey <string> | --pkey=<string>        A tenant profile key");
    console.log("  --pvalue <string> | --pvalue=<string>    A tenant profile value for the defined profile --pkey");
    console.log("                                           You may define a SINGLE pkey/pvalue pair per command\n" +
                "                                           execution");
    console.log("  \x1b[33m--genkey|--delkey\x1b[0m:");
    console.log("  --keyname <string> | --keyname=<string>  An API key name (used with --genkey/--delkey commands)");
    console.log("");
    console.log("Examples:");
    console.log(" - Get tenant information for ID 344");
    console.log("   `cloudonix-cli --tenant --get --id=344`");
    console.log("");
    console.log(" - Get tenant information for name tenant1");
    console.log("   `cloudonix-cli --tenant --get --name=tenant1`");
    console.log("");
    console.log(" - Update tenant profile for ID 344");
    console.log("   `cloudonix-cli --tenant --update --id=344 --pkey=some_key --pvalue=some_value");
    console.log("");
    console.log(" - Generate API key for tenant1 with a API key name as apikey1");
    console.log("   `cloudonix-cli --tenant --genkey --name=tenant1 --keyname=apikey1");
    process.exit(-1);
  },
  help_domains: function () {
    console.log("");
    console.log("Usage: cloudonix-cli \x1b[36m--domains \x1b[32m<command> \x1b[33m<parameters>\x1b[0m");
    console.log("");
    console.log("Where \x1b[32m<command>\x1b[0m is one of the following:");
    console.log("  --list      List the a tenants domain objects");
    console.log("  --get       Get domain object information");
    console.log("  --create    Create a new domain object");
    console.log("  --delete    Delete a domain object");
    console.log("  --update    Update a domain object's profile");
    console.log("  --enable    Set the domain as enabled");
    console.log("  --disable   Set the domain as disabled");
    console.log("  --genkey    Generate a new domain API key and set its name as --keyname");
    console.log("  --delkey    Delete an API key with the name --keyname");
    console.log("  --help      Display additional information about a specific datamodel command");
    console.log("");
    console.log("Where \x1b[33m<parameters>\x1b[0m may be one (or more) of the following:");
    console.log("");
    console.log("  \x1b[33m--get|--update|--delete|--enable|--disable|--genkey|--delkey\x1b[0m:");
    console.log("  --id <number> | --id=<number>            Numeric domain ID");
    console.log("  --name <string> | --name=<string>        A string value for the domain name");
    console.log("");
    console.log("  \x1b[33m--create|--update\x1b[0m:");
    console.log("  --app <string> | --app=<string>          A string value representing a hosted (lambda) application\n" +
                "                                           name, to set as the default domain application");
    console.log("  --appid <number> | --appid=<number>      A number value representing hosted (lambda) application ID,\n" +
                "                                           to set as the default domain application");
    console.log("  --appurl <string> | --appurl=<string>    A URL representing a remote CXML application to set as the\n" +
                "                                           default domain application");
    console.log("  --pkey <string> | --pkey=<string>        A domain profile key");
    console.log("  --pvalue <string> | --pvalue=<string>    A domain profile value for the defined profile --pkey");
    console.log("                                           You may define a SINGLE pkey/pvalue pair per command\n" +
                "                                           execution");
    console.log("");
    console.log("  \x1b[33m--genkey|--delkey\x1b[0m:");
    console.log("  --keyname <string> | --keyname=<string>  An API key name (used with --genkey/--delkey commands)");
    console.log("");
    console.log("Some words about domain profile key/value pairs:");
    console.log("Domain key/value pairs provide domains with specific functionality. While you may define whatever");
    console.log("key/value paird you may like, the following keys are reserved for specific functionality.");
    console.log("");
    console.log("\x1b[31m\x1b[1m call-timeout\x1b[0m (Boolean)\n" +
                               " Define a default call-time to be assigned to calls");
    console.log("");
    console.log("\x1b[31m\x1b[1m registration-free-control-endpoint\x1b[0m (String)\n" +
                               " Define a remote URL (http|https) implementing the RegFreeDialing API");
    console.log("");
    console.log("\x1b[31m\x1b[1m registration-free-control-endpoint-api-key\x1b[0m (String)\n" +
                               " Define an API key to be sent from Cloudonix to your remote RegFreeDialing API endpoint");
    console.log("");
    console.log("\x1b[31m\x1b[1m allowed-border\x1b[0m (Boolean)\n" +
                               " Allow border-to-border looped calls");
    console.log("");
    console.log("\x1b[31m\x1b[1m redirect-unknown-to-border\x1b[0m (Boolean)\n" +
                               " Redirect calls that can't be matched to a specific DNID over to external trunks");
    console.log("");
    console.log("\x1b[31m\x1b[1m subscribers-auto-progress\x1b[0m (Boolean)\n" +
                               " Provide in-band progress tones to calls from subscribers (web or mobile UA)");
    console.log("");
    console.log("\x1b[31m\x1b[1m lcr-address\x1b[0m (String)\n" +
                               " Define a remote URL (http|https) implementing the LCR API");
    console.log("");
    console.log("\x1b[31m\x1b[1m allow-passthrough-caller-name\x1b[0m (Boolean)\n" +
                               " Allow Caller-ID from the UA to be passed transparently to the remote party");
    console.log("");
    console.log("Examples:");
    console.log(" - List my tenants domains");
    console.log("   `cloudonix-cli --domains --list`");
    console.log("");
    console.log(" - Get domain information for mydomain.cloudonix.net");
    console.log("   `cloudonix-cli --domains --get --name=mydomain.cloudonix.net`");
    process.exit(-1);
  },
  help_trunks: function () {
    console.log("");
    console.log("Usage: cloudonix-cli \x1b[36m--trunks \x1b[32m<command> \x1b[33m<parameters>\x1b[0m");
    console.log("");
    console.log("Where \x1b[32m<command>\x1b[0m is one of the following:");
    console.log("  --list      List the a tenants trunk objects");
    console.log("  --get       Get trunk object information");
    console.log("  --create    Create a new trunk object");
    console.log("  --delete    Delete a trunk object");
    console.log("  --update    Update a trunk object's profile");
    console.log("  --help      Display additional information about a specific datamodel command");
    console.log("");
    console.log("Where \x1b[33m<parameters>\x1b[0m may be one (or more) of the following:");
    console.log("");
    console.log("  \x1b[33mMandatory\x1b[0m:");
    console.log("  --domainid <number> | --domainid=<number>     Cloudonix domain ID, or");
    console.log("  --domain <number> | --domain=<number>         Cloudonix domain name");
    console.log("");
    console.log("  \x1b[33m--get|--update|--delete\x1b[0m:");
    console.log("  --id <number> | --id=<number>                 Numeric trunk ID");
    console.log("  --name <string> | --name=<string>             A string value for the trunk name");
    console.log("");
    console.log("  \x1b[33m--create|--update\x1b[0m:");
    console.log("  --transport <string> | --transport=<string>   The trunk transport [udp|tcp|tls]");
    console.log("  --address <string> | --address=<string>       The trunk IP address or FQDN");
    console.log("  --port <number> | --port=<number>             The trunk IP PORT [5060]");
    console.log("  --direction <string> | --direction=<string>   The trunk direction [inbound|outbound]");
    console.log("  --pkey <string> | --pkey=<string>             A trunk profile key");
    console.log("  --pvalue <string> | --pvalue=<string>         A trunk profile value for the defined --pkey");
    console.log("                                                You may define a SINGLE pkey/pvalue pair per command\n" +
                "                                                execution");
    console.log("Examples:");
    console.log(" - List my trunks");
    console.log("   `cloudonix-cli --trunks --list`");
    console.log("");
    console.log(" - List trunks for a mydomain.cloudonix.net");
    console.log("   `cloudonix-cli --trunks --list --domain=mydomain.cloudonix.net`");
    console.log("");
    console.log(" - Create trunk for mydomain.cloudonix.net");
    console.log("   `cloudonix-cli --trunks --create --domain=mydomain.cloudonix.net --name=mytrunk1 \\\n" +
                "    --transport=udp --address=192.168.1.3 --port=5060 --direction=outbound`");
    process.exit(-1);
  },
  help_applications: function () {
    console.log("");
    console.log("Usage: cloudonix-cli \x1b[36m--applications \x1b[32m<command> \x1b[33m<parameters>\x1b[0m");
    console.log("");
    console.log("Where \x1b[32m<command>\x1b[0m is one of the following:");
    console.log("  --list      List the a tenants application objects");
    console.log("  --get       Get application object information");
    console.log("  --create    Create a new application object");
    console.log("  --delete    Delete a application object");
    console.log("  --update    Update a application object's profile");
    console.log("  --enable    Set the application as enabled");
    console.log("  --disable   Set the application as disabled");
    console.log("  --listkeys  List an applications associated API keys");
    console.log("  --genkey    Generate a new application API key and set its name as --keyname");
    console.log("  --delkey    Delete an application API key with the name --keyname");
    console.log("  --help      Display additional information about a specific datamodel command");
    console.log("");
    console.log("Where \x1b[33m<parameters>\x1b[0m may be one (or more) of the following:");
    console.log("");
    console.log("  \x1b[33mMandatory\x1b[0m:");
    console.log("  --domainid <number> | --domainid=<number>   Cloudonix domain ID, or");
    console.log("  --domain <number> | --domain=<number>       Cloudonix domain name");
    console.log("");
    console.log("  \x1b[33m--get|--update|--delete|--enable|--disable|--getkey|--delkey\x1b[0m:");
    console.log("  --id <number> | --id=<number>               Numeric application ID");
    console.log("");
    console.log("  \x1b[33m--create|--get|--update|--delete|--enable|--disable|--getkey|--delkey\x1b[0m:");
    console.log("  --name <string> | --name=<string>           A string value for the application name");
    console.log("");
    console.log("  \x1b[33m--update|--create\x1b[0m:");
    console.log("  --appurl <string> | --appurl=<string>       A URL representing a remote application");
    console.log("  --type <string> | --type=<string>           Application language [cloudonix|twiml]");
    console.log("  --pkey <string> | --pkey=<string>           A trunk profile key");
    console.log("  --pvalue <string> | --pvalue=<string>       A trunk profile value for the defined --pkey");
    console.log("                                              You may define a SINGLE pkey/pvalue pair per command\n" +
                "                                              execution");
    console.log("  \x1b[32m--genkey|--delkey\x1b[0m:");
    console.log("  --keyname <string> | --keyname=<string>     An API key name (used with --genkey/--delkey commands)");
    console.log("");
    console.log("Examples:");
    console.log(" - List my applications");
    console.log("   `cloudonix-cli --applications --list`");
    console.log("");
    console.log(" - List applications for a mydomain.cloudonix.net");
    console.log("   `cloudonix-cli --applications --list --domain=mydomain.cloudonix.net`");
    console.log("");
    console.log(" - Create application for mydomain.cloudonix.net");
    console.log("   `cloudonix-cli --applications --create --domain=mydomain.cloudonix.net --name=myapplication1 \\\n" +
                "    --appurl=https://myremote.server.com/myscript --type=cloudonix`");
    process.exit(-1);
  },
  help_subscribers: function () {
    console.log("");
    console.log("Usage: cloudonix-cli \x1b[36m--subscribers \x1b[32m<command> \x1b[33m<parameters>\x1b[0m");
    console.log("");
    console.log("Where \x1b[32m<command>\x1b[0m is one of the following:");
    console.log("  --list      List the a subscribers objects of a specific domain");
    console.log("  --get       Get a subscriber object information");
    console.log("  --create    Create a new subscriber object");
    console.log("  --delete    Delete a subscriber object");
    console.log("  --update    Update a subscriber object's profile");
    console.log("  --enable    Set the application as enabled");
    console.log("  --disable   Set the application as disabled");
    console.log("  --help      Display additional information about a specific datamodel command");
    console.log("");
    console.log("Where \x1b[33m<parameters>\x1b[0m may be one (or more) of the following:");
    console.log("");
    console.log("  \x1b[33mMandatory\x1b[0m:");
    console.log("  --domainid <number> | --domainid=<number>   Cloudonix domain ID, or");
    console.log("  --domain <number> | --domain=<number>       Cloudonix domain name");
    console.log("");
    console.log("  \x1b[33m--get|--delete|--update|--enable|--disable\x1b[0m:");
    console.log("  --id <number> | --id=<number>               Numeric subscriber ID");
    console.log("");
    console.log("  \x1b[33m--create|--update\x1b[0m:");
    console.log("  --msisdn <string> | --msisdn=<string>       A subscriber MSISDN (Phone number)");
    console.log("  --secret <string> | --secret=<string>       An assigned password (SIP registration)");
    console.log("  --gensecret <number> | --gensecret=<number> Generate a password, <number> long (SIP registration)");
    console.log("  --pkey <string> | --pkey=<string>           A subscriber profile key");
    console.log("  --pvalue <string> | --pvalue=<string>       A subscriber profile value for the defined --pkey");
    console.log("                                              You may define a SINGLE pkey/pvalue pair per command\n" +
                "                                              execution");
    console.log("");
    console.log("Examples:");
    console.log(" - List subscribers for mydomain.cloudonix.net domain");
    console.log("   `cloudonix-cli --subscribers --list --domain=mydomain.cloudonix.net`");
    console.log("");
    console.log(" - Create subscriber for mydomain.cloudonix.net domain");
    console.log("   `cloudonix-cli --subscribers --create --domain=mydomain.cloudonix.net \\\n" +
                "    --msisdn=12127777777 --gensecret=24 `");
    process.exit(-1);
  },
  help_dnids: function () {
    process.exit(-1);
  },
  help_config: function () {
    console.log("config help");
    process.exit(-1);
  },
  help_general: function (errorMessage='') {
    console.log("\x1b[31m" + errorMessage + "\x1b[0m");
    console.log("");
    console.log("Usage: cloudonix-cli [--help|-h] <datamodel> <command> [parameters]");
    console.log("");
    console.log("  -h|--help          Display additional information about a specific datamodel command");
    console.log("");
    console.log("Where <datamodel> is one of the following:");
    console.log("  -T|--tenant        Tenant datamodel");
    console.log("  -D|--domains       Domains datamodel");
    console.log("  -t|--trunks        Trunks datamodel");
    console.log("  -a|--applications  Applications datamodel");
    console.log("  -d|--dnids         DNIDs datamodel");
    console.log("  -s|--subscribers   Subscribers datamodel");
    console.log("  -u|--users         Users datamodel");
    console.log("  -c|--config        Configure cloudonix-cli environment file (~/.env.cloudonix.cli)");
    console.log("");
    console.log("Where <command> is one of the following:");
    console.log("  --list             List datamodel objects");
    console.log("  --get              Get a datamodel object");
    console.log("  --create           Create a datamodel object");
    console.log("  --delete           Delete a datamodel object");
    console.log("  --update           Update a datamodel object");
    console.log("");
    process.exit(-1);
  }
}
