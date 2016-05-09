Meteor.method('submitpost', function(post) {
    if (this.userId) {
        post.userId = this.userId;
        Posts.submit(post);
    }
}, {
    url: '/api/submitpost/',
    httpMethod: "post",
    getArgsFromRequest: function(request) {
        if (request.headers['content-type'] === 'application/json') {
            if (request.authToken !== undefined) {
                var post = request.body;
                // check(post, Posts.simpleSchema());
                return [post];
            }
            else {
                var error = new Meteor.Error('not_logged_in', 'User Not Logged In');
                error.statusCode = 401;
                throw error;
            }
        }
    }
});

JsonRoutes.ErrorMiddleware.use(RestMiddleware.handleErrorAsJson);