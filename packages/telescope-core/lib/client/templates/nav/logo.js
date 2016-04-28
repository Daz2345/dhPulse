Template.logo.helpers({
  logoUrl: function(){
    return Settings.get("logoUrl");
  }
});

Template.logo.onRendered(function  () {
  $(".side-nav .logo-text").quickfit({
    min: 16,
    max: 40,
    truncate: false
  });
});

Template.logo.events({
  'click a': function(e){
    e.preventDefault();
    FlowRouter.go('postsDefault', null, null);
    // (FlowRouter.getRouteName() === 'postsDefault') ? FlowRouter.go('postsDefault', null, null) : window.history.back();
  }
})