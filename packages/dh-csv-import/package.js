Package.describe({
  summary: 'dunnhumby csv import',
  version: '0.1.0',
  name: 'dh:csv-import'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  Npm.depends({
    'fs-exists' : '0.1.1',
    'fs-extra' : '0.26.2'
  });

  var packages = [
    'telescope:core@0.25.5',
    'telescope:posts@0.25.5',
    'evaisse:csv@0.1.4'
  ];

  api.use(packages);
  api.imply(packages);

  // ---------------------------------- 2. Files to include ----------------------------------

  // i18n config (must come first)

  // api.addFiles([
  //   'package-tap.i18n'
  // ], ['client', 'server']);

  // client & server

  // api.addFiles([
  //   'lib/CsvToCollection.js'
  // ], ['client', 'server']);

  // client

  // api.addFiles([
  //   'lib/client/templates/hello.html',
  //   'lib/client/templates/hello.js',
  //   'lib/client/templates/custom_post_title.html',
  //   'lib/client/templates/custom_post_title.js',
  //   'lib/client/stylesheets/custom.scss',
  //   'lib/client/custom_templates.js'
  // ], ['client']);

  // server

  api.addFiles([
    'lib/cron.js',
    'lib/importCSV.js'
  ], ['server']);

  // i18n languages (must come last)

  // api.addFiles([
  //   'i18n/en.i18n.json'
  // ], ['client', 'server']);

});
