Meteor.subscribe('allUsers');
    
Template.mention.rendered = function() {
    
    $("textarea").mention({
        delimiter: '@',
        users: Users.find().fetch(),
        typeaheadOpts: {
            items: 10 // Max number of items you want to show
        },
        sensitive: false,
        emptyQuery: true,
        queryBy: ['telescope.displayName', 'username'],
    });
};