Template.mention.rendered = function() {

    var myCats = Users.getCategories(Meteor.user()),
        postCats = Posts.current().categories,
        mentionCats = _.intersection(myCats, postCats);

    if (myCats !== undefined) {
        var userLkp = Users.find({categories: {$in: mentionCats}}).fetch() // this needs looking at to limit the people that can be contacted by each individual!!
    }
    else {
        var userLkp = Users.find().fetch()
    }

    $("textarea").mention({
        delimiter: '@',
        users: userLkp,
        typeaheadOpts: {
            items: 10 // Max number of items you want to show
        },
        sensitive: true,
        emptyQuery: false,
        queryBy: ['telescope.displayName', 'username', 'email'],
    });
};
