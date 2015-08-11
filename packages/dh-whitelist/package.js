Package.describe({
  summary: 'Whitelist - controls access to application ',
  version: '0.1.0',
  name: 'dh:whitelist'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  api.use("cybit:ip-blocker@1.0.4");

  // ---------------------------------- 2. Files to include ----------------------------------

  // server

  api.addFiles([
    'lib/server/whitelist.js'
  ], ['server']);


});
