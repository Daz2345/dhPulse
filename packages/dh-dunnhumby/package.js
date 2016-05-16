Package.describe({
  summary: 'dunnhumby specific package',
  version: '0.1.0',
  name: 'dh:dunnhumby'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
    'telescope:core@0.25.6',    
    'telescope:lib@0.25.6',    
    'telescope:users@0.25.6',
    'telescope:posts@0.25.6',
    'dh:personal',
    'fastclick',
    'appcache',
    'random',
    'force-ssl',
    '255kb:meteor-status@1.4.2',
    // 'meteortoys:allthings@2.2.0',
    'mdg:reload-on-resume@1.0.4',
    'aldeed:autoform@5.7.1',
    'mpowaga:autoform-summernote@0.4.2',
    // 'meteorhacks:zones@1.6.0',
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
    'lib/callbacks.js',
    'lib/custom_fields.js',
    'lib/users.js',
    'lib/start.js',    
  ], ['client', 'server']);

  // // client

  api.addFiles([
    'lib/client/stylesheets/test.scss',     
    'lib/client/stylesheets/pleaseWait.scss',
    'lib/client/templates/dh_post_edit.html', 
    'lib/client/templates/dh_post_submit.html',    
    'lib/client/templates/dh_tabs.html',  
    'lib/client/templates/dh_icon.html',   
    'lib/client/templates/dh_icon.js',   
    'lib/client/templates/dh_layout.html',   
    'lib/client/templates/dh_posts_list.html',   
    'lib/client/templates/dh_post_item.js',   
    'lib/client/templates/dh_submit_button.html',    
    'lib/client/templates/landingPage.html',
    'lib/client/templates/main.html',
    'lib/client/templates/main.js',
    'lib/client/templates/dh_users_dashboard.html',
    'lib/client/templates/dh_users_dashboard.js',    
    'lib/client/templates/dh_post_page.html',
    'lib/client/templates/dh_users_list_actions.html',
    'lib/client/templates/dh_users_list_actions.js',    
    'lib/client/templates/dh_user_menu_label.html',
    'lib/client/templates/pleaseWait.html',
    'lib/client/templates/pleaseWait.js',
    'lib/client/custom_templates.js'  
  ], ['client']);

  // // server

  api.addFiles([
    'lib/server/start.js'
  ], ['server']);

  // // i18n languages (must come last)

  // api.addFiles([
  //   'i18n/en.i18n.json'
  // ], ['client', 'server']);

});
