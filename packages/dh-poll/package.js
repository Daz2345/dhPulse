Package.describe({
  summary: 'dunnhumby poll package',
  version: '0.1.0',
  name: 'dh:poll'
});

Package.onUse(function (api) {


  var packages = [
    'telescope:core@0.25.5',
    'telescope:lib@0.25.5',    
    'telescope:posts@0.25.5',  
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
    'lib/client/stylesheets/poll.css',    
    'lib/client/templates/poll.html',
    'lib/client/templates/poll.js',
  ], ['client']);

  // server

  api.addFiles([
    'lib/server/methods.js'
  ], ['server']);
  
});
