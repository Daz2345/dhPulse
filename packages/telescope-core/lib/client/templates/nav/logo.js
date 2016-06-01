Template.logo.helpers({
  logoUrl: function(){
    return Settings.get("logoUrl");
  },
  logoLink: function() {
    return FlowRouter.path('postsDefault');
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
    if (FlowRouter.getRouteName() === 'postPage') { 
      e.preventDefault();
      window.history.back();
    } 
    // else {
    //   FlowRouter.go('postsDefault', null, null); 
    // }
  }
})