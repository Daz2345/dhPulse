Template.post_star.helpers({
  starred: function() {
      return  _.contains(this.starred, Meteor.userId());
  }
});


Template.post_star.events({
  'click .star-post': function(e) {
    Meteor.call('starPost', this._id);
  },
  'click .unstar-post': function(e) {
    Meteor.call('unstarPost', this._id);
  },
});
