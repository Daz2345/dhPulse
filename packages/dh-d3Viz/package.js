Package.describe({
  summary: 'dunnhumby d3 viz package',
  version: '0.1.0',
  name: 'dh:d3'
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
    'lib/client/templates/d3.html',
    'lib/client/templates/d3.js',
    'lib/client/stylesheets/custom.scss'
  ], ['client']);

});
