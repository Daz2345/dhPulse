Package.describe({
  summary: 'dunnhumby specific package',
  version: '0.1.0',
  name: 'dh:dunnhumby'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
    'telescope:core@0.25.5',    
    'telescope:lib@0.25.5',    
    'telescope:users',
    'dh:personal',
    'fastclick',
    // 'force-ssl',
    '255kb:meteor-status@1.4.2',
    'msavin:mongol@1.6.1',
    'mpowaga:autoform-summernote@0.4.2',
    'meteorhacks:zones@1.6.0',
    // 'mixmax:smart-disconnect'
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
    // 'lib/custom_fields.js',
    'lib/users.js'
  ], ['client', 'server']);

  // // client

  api.addFiles([
    'lib/client/templates/dh_post_edit.html', 
    'lib/client/templates/dh_post_submit.html',    
    'lib/client/templates/dh_tabs.html',  
    'lib/client/templates/dh_layout.html',   
    'lib/client/templates/dh_submit_button.html',    
    'lib/client/templates/main.html',
    'lib/client/templates/main.js',
    'lib/client/templates/dh_users_dashboard.html',
    'lib/client/templates/dh_users_dashboard.js',    
    'lib/client/templates/dh_post_page.html',
    'lib/client/templates/dh_users_list_actions.html',
    'lib/client/templates/dh_users_list_actions.js',    
    'lib/client/templates/dh_user_menu_label.html',
    'lib/client/custom_templates.js'  
  ], ['client']);

  // // server

  api.addFiles([
    // 'lib/server/templates/custom_emailPostItem.handlebars'
    'lib/server/start.js'
  ], ['server']);

  // // i18n languages (must come last)

  // api.addFiles([
  //   'i18n/en.i18n.json'
  // ], ['client', 'server']);

});
