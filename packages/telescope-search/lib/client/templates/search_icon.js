Template.search_icon.events({
    'click a': function(e) {
        // e.preventDefault();
        var hidden = Session.get('hide_search');
        if (hidden) {
            Session.set('hide_search', false);
            $('#search-field').focus();
        } else {
            Session.set('hide_search', true);
        }
    }
});

Meteor.startup(
    Session.set('hide_search', true)
);
  
