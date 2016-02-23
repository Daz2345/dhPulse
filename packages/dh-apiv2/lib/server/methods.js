Meteor.method('submitpost', function(post){
    Posts.submit(post);
    },{
        url: '/api/submitpost/',
        getArgsFromRequest: function (request) {
            var post = request.body;
            check(post, Posts.simpleSchema());
            
                console.log(request);
                console.log(post);
            
            return [ post ];
        }
    }
);   