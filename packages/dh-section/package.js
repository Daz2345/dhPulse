Package.describe({
  summary: 'dunnhumby section package',
  version: '0.1.0',
  name: 'dh:section'
});

Package.onUse(function (api) {

  var packages = [
    'dh:chart'
  ];

  api.use(packages);
  api.imply(packages);

  // ---------------------------------- 2. Files to include ----------------------------------

  // client & server

  api.addFiles([
    'lib/custom_fields.js',
  ], ['client', 'server']);

  // client

  api.addFiles([
    'lib/client/templates/sections.html',
    'lib/client/templates/section.html',
    'lib/client/templates/section.js'
  ], ['client']);

});