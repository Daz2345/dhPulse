Package.describe({
  summary: 'dunnhumby personalisation package',
  version: '0.1.0',
  name: 'dh:personal'
});

Package.onUse(function (api) {

  var packages = [
    'telescope:core',
    'telescope:posts',
    'telescope:users'
  ];

  api.use(packages);
  api.imply(packages);

  // ---------------------------------- 2. Files to include ----------------------------------

  // client

  api.addFiles([
    'lib/client/stylesheets/mention.css',
    'lib/client/stylesheets/bootstrap-combined.no-icons.min.css',
    'lib/client/mentions.js',
    'lib/client/bootstrap-typeahead2.js',
    'lib/client/mention.html',  
    'lib/client/mention.js'
  ], ['client']);

  // client & server

  api.addFiles([
    'lib/custom_fields.js',
    'lib/parameters.js'
  ], ['client', 'server']);

});


// There are also changes within telescope:posts and telescope:users that need to be checked