Package.describe({
  summary: 'dunnhumby Push Notifications',
  version: '0.1.0',
  name: 'dh:push'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
    'telescope:core', 
    'raix:push@3.0.0'
  ];

  api.use(packages);
  api.imply(packages);

  // // ---------------------------------- 2. Files to include ----------------------------------

  // //  client
  
  api.addFiles([
    'lib/custom_fields.js'
  ], ['server', 'client']);
  
  // //  server

  api.addFiles([
    'lib/server/pushMethods.js',
    'lib/server/pushNotifications.js'
  ], ['server']);



});
