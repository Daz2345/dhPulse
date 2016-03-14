Package.describe({
  summary: 'dunnhumby full dhpulse API v3',
  version: '0.1.0',
  name: 'dh:apiv3'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------
  var packages = [
    "meteorhacks:picker@1.0.3",
    "telescope:core"
    ];
    
  api.use(packages);
  api.imply(packages);
  
  // ---------------------------------- 2. Files to include ----------------------------------

  // server

  api.addFiles([
    'lib/server/api.js'
  ], ['server']);

});
