Template.search_icon.events({
    'click .search_icon': function(e) {
        e.preventDefault();

        if (Session.get('hide_search')) {
            Session.set('hide_search', false);
            $('#search-field').focus();
        } else {
            Session.set('hide_search', true);
            FlowRouter.setQueryParams({query: null});
        }
    }
});

Meteor.startup(
    Session.set('hide_search', true)
);
  
