Package.describe({
  summary: 'dunnhumby Push Notifications',
  version: '0.1.0',
  name: 'dh:push'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
    'telescope:core', 
    'raix:push@2.6.12'
  ];

  api.use(packages);
  api.imply(packages);

  // // ---------------------------------- 2. Files to include ----------------------------------

  // //  server

  api.addFiles([
    'lib/server/pushMethods.js',
    'lib/server/pushNotifications.js'
  ], ['server']);

});
