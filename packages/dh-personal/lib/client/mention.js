// Meteor.subscribe('allUsers');
    
Template.mention.rendered = function() {
    
    // if (Users.is.dunnhumby(Meteor.user())) {
    //     var userLkp = Users.find().fetch()
    // } else {
    //     // var myCats = 
    //     var userLkp = Users.find({}).fetch() // this needs looking at to limit the people that can be contacted by each individual!!
    // }
    
    $("textarea").mention({
        delimiter: '@',
        users: Users.find().fetch(), 
        typeaheadOpts: {
            items: 10 // Max number of items you want to show
        },
        sensitive: true,
        emptyQuery: false,
        queryBy: ['telescope.displayName', 'username', 'email'],
    });
};