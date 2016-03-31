// for backwards compatibility's sake, accept a "limit" segment
Picker.route('/api/posts/:limit?', function(params, req, res, next) {
  if (typeof params.limit !== "undefined") {
    params.query.limit = params.limit;
  }
  res.end(servePosts(params.query));
});

Picker.route('/api/categories/', function(params, req, res, next) {
  res.end(serveCategories());
});