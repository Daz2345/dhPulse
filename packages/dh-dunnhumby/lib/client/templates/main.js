Meteor.startup(function() {

  // SEO.config({
  //   ignore: {
  //     meta: ['fragment', 'viewport', 'apple-mobile-web-app-capable', 'mobile-web-app-capable', 'apple-mobile-web-app-title', 'apple-mobile-web-app-status-bar-style'],
  //     link: ['stylesheet', 'icon', 'apple-touch-icon', 'apple-touch-icon-precomposed', 'apple-touch-startup-image', 'alternate']
  //   }
  // });

  Telescope.utils.icons = {
    expand: "angle-right",
    collapse: "angle-down",
    next: "angle-right",
    close: "times",
    upvote: "thumbs-up",
    voted: "check",
    downvote: "thumbs-down",
    facebook: "facebook-square",
    twitter: "twitter",
    googleplus: "google-plus",
    linkedin: "linkedin-square",
    comment: "comment-o",
    share: "share-square-o",
    more: "ellipsis-h",
    menu: "bars",
    subscribe: "envelope-o",
    delete: "trash-o",
    edit: "pencil",
    popularity: "fire",
    time: "clock-o",
    best: "star",
    search: "search",
    edit: "pencil",
    approve: "check-circle-o",
    reject: "times-circle-o",
    views: "eye",
    clicks: "mouse-pointer", 
    score: "line-chart"
  };

  Session.set("Mongol", {
  	'collections': ['Posts', 'Users', 'Categories', 'Pages'],
  	'display': false,
  	'opacity_normal': ".5",
  	'opacity_expand': "1",
  	'disable_warning': 'false'
  });

  // Tracker.autorun(function() {
  //   if (Meteor.user() && !Meteor.loggingIn()) {
  //     var intercomSettings = {
  //       name: Meteor.user().profile.username,
  //       bio: Meteor.user().profile.bio,
  //       email: Meteor.user().emails[0].address,
  //       dunnhumby: Meteor.user().isdunnhumby,
  //       admin: Meteor.user().isAdmin,
  //       created_at: Math.round(Meteor.user().createdAt / 1000),
  //       app_id: "rmdzek63"
  //     };
  //     Intercom('boot', intercomSettings);
  //   }
  // });

});