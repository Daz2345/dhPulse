Package.describe({
  summary: 'dunnhumby ground - offline database!!',
  version: '0.1.0',
  name: 'dh:ground'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
    'telescope:core@0.25.5',    
    'telescope:lib@0.25.5',    
    'telescope:users@0.25.5',
    'ground:db@0.3.14'
  ];

  api.use(packages);
  api.imply(packages);

  // ---------------------------------- 2. Files to include ----------------------------------

  // client & server

  api.addFiles([
    'lib/ground.js'
  ], ['client', 'server']);


});
