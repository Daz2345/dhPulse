FlowRouter.route('/', {
  name: "postsDefault",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "main_posts_list", guest: "landing_page"});
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
  triggersEnter: [trackRouteEntry],
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "post_page"});
  }
});

function trackRouteEntry(context) {
  var sessionId = Meteor.default_connection && Meteor.default_connection._lastSessionId ? Meteor.default_connection._lastSessionId : null;
  Meteor.call('increasePostViews', context.params._id, sessionId);
  Meteor.call('addToReadBy', context.params._id);
}

FlowRouter.route('/submit', {
  name: "postSubmit",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "post_submit"});
  }
});
