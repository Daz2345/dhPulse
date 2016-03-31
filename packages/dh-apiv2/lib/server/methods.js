Meteor.method('submitpost', function(post){
    if (this.userId) {
        post.userId = this.userId;
        Posts.submit(post);        
    }
    },{
        url: '/api/submitpost/',
        getArgsFromRequest: function (request) {
            var post = request.body;

            check(post, Posts.simpleSchema());

            return [ post ];
        }
    }
);   