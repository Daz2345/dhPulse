var insertSettings = function() {
    
    var defaultSettings = {
        "requirePostsApproval" : false, 
        "enableDownvotes" : true, 
        "scoreUpdateInterval" : 30, 
        "language" : "en", 
        "showTaglineBanner" : false, 
        "postInterval" : 30, 
        "outsideLinksPointTo" : "page", 
        "maxPostsPerDay" : 30, 
        "postsPerPage" : 10, 
        "commentInterval" : 15, 
        "accentColor" : "#e17000", 
        "secondaryColor" : "#353433", 
        "debug" : false, 
        "requireViewInvite" : true, 
        "requirePostInvite" : true, 
        "startInvitesCount" : 3, 
        "enableNewsletter" : false, 
        "showBanner" : false, 
        "newsletterTime" : "00:00", 
        "autoSubscribe" : false, 
        "emailNotifications" : true, 
        "title" : "dhPulse", 
        "siteUrl" : "https://dhpulse-daz2345.c9.io/", 
        "navLayout" : "top-nav", 
        "logoUrl" : "/img/dhlogo.png", 
        "faviconUrl" : "/web/icons/favicon.ico", 
        "authMethods" : [ "email" ], 
        "tagline" : "what your customers are thinking, feeling and doing", 
        "defaultEmail" : "darren.impey@dunnhumby.com", 
        "categoriesBehavior" : "single", 
        "hideEmptyCategories" : true, 
        "footerCode" : "© dunnhumby", 
        "defaultView" : "new", 
        "postsLayout" : "posts-list", 
        "kadiraAppId" : "bkwDJb9oSL4mwbwy4", 
        "kadiraAppSecret" : "36e4a631-8ca8-4577-8111-a6d61480fb52", 
        "RSSLinksPointTo" : "page", 
        "loadMoreBehavior" : "button", 
        "postViews" : [ "top", "new", "best", "starred" ], 
        "logoHeight" : 58, 
        "logoWidth" : 185 
    };
  
    Settings.insert(defaultSettings)
};



Meteor.startup(function () {
  // insert dummy content only if createDummyContent hasn't happened and there aren't any posts in the db
  if (!Events.findOne({name: 'insertSettings'}) && !Settings.find().count()) {
    insertSettings();
    Events.log({name: 'insertSettings', unique: true,important: true});
  }
});