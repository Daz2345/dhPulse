Package.describe({
  summary: 'dunnhumby specific package',
  version: '0.1.0',
  name: 'dh:dunnhumby'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
    'telescope:core',    
    'telescope:users',
    'fastclick',
    'force-ssl',
    '255kb:meteor-status',
    'natestrauser:animate-css',
    'meteorhacks:zones',
    'mixmax:smart-disconnect'
  ];

  api.use(packages);
  api.imply(packages);

  // ---------------------------------- 2. Files to include ----------------------------------

  // i18n config (must come first)

  // api.addFiles([
  //   'package-tap.i18n'
  // ], ['client', 'server']);

  // // client & server

  api.addFiles([
    'lib/custom_fields.js',
    'lib/users.js',
    // 'lib/template_modules.js',
    // 'lib/callbacks.js'
  ], ['client', 'server']);

  // // client

  api.addFiles([
    'lib/client/templates/main.html',
    'lib/client/templates/main.js',
    'lib/client/templates/users_dashboard_dh.html',
    'lib/client/templates/users_dashboard_dh.js',    
    'lib/client/templates/post_page_dh.html',
    'lib/client/templates/users_list_actions_dh.html',
    'lib/client/templates/users_list_actions_dh.js',    
    'lib/client/custom_templates.js'  
    // 'lib/client/templates/custom_post_title.html',
    // 'lib/client/templates/custom_post_title.js',
    // 'lib/client/stylesheets/custom.scss',
  ], ['client']);

  // // server

  // api.addFiles([
  //   'lib/server/templates/custom_emailPostItem.handlebars'
  // ], ['server']);

  // // i18n languages (must come last)

  // api.addFiles([
  //   'i18n/en.i18n.json'
  // ], ['client', 'server']);

});
