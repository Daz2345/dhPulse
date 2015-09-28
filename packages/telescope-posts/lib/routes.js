// <<<<<<< HEAD
// /**
// * The Posts.controllers namespace
// * @namespace Posts.controllers
// */
// Posts.controllers = {};

// /**
// * Controller for all posts lists
// */
// Posts.controllers.list = RouteController.extend({

//   template: "posts_list_controller",

//   showViewsNav: true,

//   data: function () {

//     var userLoggedIn = (Meteor.user() !== null) ? true : this.userLoggedIn;
//     var userCats = (userLoggedIn) ? Meteor.user().categories : "";

//     var terms = {
//       view: this.view,
//       limit: this.params.limit || Settings.get('postsPerPage', 10),
//       // category: userCats,
//       enableCache: true
//     };

//     if (terms.view !== 'category') {
//       terms.category = userCats;
//     }
    
//     // console.log('----------------- router running');

//     // note: the post list controller template will handle all subscriptions, so we just need to pass in the terms
//     return {
//       terms: terms
//     };
//   },

//   getTitle: function () {
//     return i18n.t(this.view);
//   },

//   getDescription: function () {
//     if (Router.current().route.getName() === 'posts_default') { // return site description on root path
//       return Settings.get('description');
//     } else {
//       return i18n.t(_.findWhere(Telescope.menuItems.get("viewsMenu"), {label: this.view}).description);
//     }
// =======
FlowRouter.route('/', {
  name: "postsDefault",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "main_posts_list"});
  }
});

FlowRouter.route('/posts/:_id/edit', {
  name: "postEdit",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "post_edit"});
  }
});

FlowRouter.route('/posts/:_id/:slug?', {
  name: "postPage",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "post_page"});
  }
});

var trackRouteEntry = function (context) {
  var sessionId = Meteor.default_connection && Meteor.default_connection._lastSessionId ? Meteor.default_connection._lastSessionId : null;
  Meteor.call('increasePostViews', context.params._id, sessionId);
}

FlowRouter.route('/submit', {
  name: "postSubmit",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "post_submit"});
  }
});
