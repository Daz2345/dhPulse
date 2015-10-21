/**
 * Parameter callbacks let you add parameters to subscriptions 
 * @namespace Posts.parameters
 */
Posts.parameters = {};

/**
 * Takes a set of terms, and translates them into a `parameter` object containing the appropriate find
 * and options arguments for the subscriptions's Posts.find()
 * @param {Object} terms
 */
Posts.parameters.get = function (terms) {

  // add this to ensure all post publications pass audit-arguments-check
  check(terms, Match.Any);

  // console.log(terms)

  // note: using jquery's extend() with "deep" parameter set to true instead of shallow _.extend()
  // see: http://api.jquery.com/jQuery.extend/

  // initialize parameters by extending baseParameters object, to avoid passing it by reference
  var parameters = Telescope.utils.deepExtend(true, {}, Posts.views.baseParameters);

  // iterate over postsParameters callbacks
  parameters = Telescope.callbacks.run("postsParameters", parameters, terms);
  
  // if sort options are not provided, default to "top" sort
  if (_.isEmpty(parameters.options.sort)) {
    parameters.options.sort = {sticky: -1, score: -1};
  }
 
  // extend sort to sort posts by _id to break ties
  // NOTE: always do this last to avoid _id sort overriding another sort
  parameters = Telescope.utils.deepExtend(true, parameters, {options: {sort: {_id: -1}}});

  // console.log(parameters);

  return parameters;
};

// Parameter callbacks

// View Parameter
// Add a "view" property to terms which can be used to filter posts. 
function addViewParameter (parameters, terms) {

  // if view is not defined, default to "top"
  var view = !!terms.view ? Telescope.utils.dashToCamel(terms.view) : 'top';

  // get query parameters according to current view
  if (typeof Posts.views[view] !== 'undefined')
    parameters = Telescope.utils.deepExtend(true, parameters, Posts.views[view](terms));

  return parameters;
}
Telescope.callbacks.add("postsParameters", addViewParameter);

// View Parameter
// Add "after" and "before" properties to terms which can be used to limit posts in time. 
function addTimeParameter (parameters, terms) {

  if (typeof parameters.find.postedAt === "undefined") {
  
    var postedAt = {};

    if (terms.after) {
      postedAt.$gte = moment(terms.after, "YYYY-MM-DD").startOf('day').toDate();
    }

    if (terms.before) {
      postedAt.$lt = moment(terms.before, "YYYY-MM-DD").endOf('day').toDate();
    }

    if (!_.isEmpty(postedAt)) {
      parameters.find.postedAt = postedAt;
    }

  }

  return parameters;
}
Telescope.callbacks.add("postsParameters", addTimeParameter);

// limit the number of items that can be requested at once
function limitPosts (parameters, terms) {
  var maxLimit = 200;
  // if a limit was provided with the terms, add it too (note: limit=0 means "no limit")
  if (typeof terms.limit !== 'undefined') {
    _.extend(parameters.options, {limit: parseInt(terms.limit)});
  }

  // limit to "maxLimit" items at most when limit is undefined, equal to 0, or superior to maxLimit
  if(!parameters.options.limit || parameters.options.limit === 0 || parameters.options.limit > maxLimit) {
    parameters.options.limit = maxLimit;
  }
  return parameters;
}
Telescope.callbacks.add("postsParameters", limitPosts);

// hide future scheduled posts unless "showFuture" is set to true or postedAt is already defined
function hideFuturePosts (parameters, terms) {

  var now = new Date();

  if (!parameters.showFuture) {

    if (!!parameters.find.postedAt) {
    
      if (!!parameters.find.postedAt.$lt) {

        // if postedAt.$lt is defined, use it or current date, whichever is earlier in time
        var lt = parameters.find.postedAt.$lt;
        parameters.find.postedAt.$lt = lt < now ? lt : now;
      
      } else {

        // if postedAt.$lt doesn't exist, use current date
       parameters.find.postedAt.$lt = now;

      }

    } else {

      // if postedAt doesn't exist at all, set it to {$lt: now}
      parameters.find.postedAt = { $lt: now };

    }

  }

  return parameters;
}
// Telescope.callbacks.add("postsParameters", hideFuturePosts);

// limit the post categories to those that the user has pemission to see
function userCategories (parameters, terms) {

    var categoriesIds = [];
    var find = {};
    var userCats = Users.getCategoriesById(terms.userId);

  if (typeof userCats !== 'undefined') {

    if (typeof userCats === "string") { // cat is a string
      find = {"_id": userCats};
    } else { // cat is an array
      find = {"_id": { $in : userCats}};
    }

    // get all categories passed in terms
    var categories = Categories.find(find).fetch();
    
    // for each category, add its ID and the IDs of its children to categoriesId array
    categories.forEach(function (category) {
      categoriesIds.push(category._id);
      categoriesIds = categoriesIds.concat(_.pluck(category.getChildren(), "_id"));
    });

    parameters.find.categories = {$in: categoriesIds};
  }
  return parameters;
}
Telescope.callbacks.add("postsParameters", userCategories);