/**
 * Parameter callbacks let you add parameters to subscriptions 
 * @namespace Posts.parameters
 */
Stockalerts.parameters = {};

/**
 * Takes a set of terms, and translates them into a `parameter` object containing the appropriate find
 * and options arguments for the subscriptions's Posts.find()
 * @param {Object} terms
 */
Stockalerts.parameters.get = function (terms) {

  // add this to ensure all post publications pass audit-arguments-check
  check(terms, Match.Any);

  // console.log(terms)

  // note: using jquery's extend() with "deep" parameter set to true instead of shallow _.extend()
  // see: http://api.jquery.com/jQuery.extend/

  // initialize parameters by extending baseParameters object, to avoid passing it by reference
  var parameters = Telescope.utils.deepExtend(true, {}, Stockalerts.views.baseParameters);

  // iterate over postsParameters callbacks
  parameters = Telescope.callbacks.run("stockalertsParameters", parameters, terms);
  
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

// Time Parameter
// Add "after" and "before" properties to terms which can be used to limit posts in time. 
function addTimeParameter (parameters, terms) {

  if (typeof parameters.find.postedAt === "undefined") {
  
    var createdAt = {};

    if (terms.after) {
      createdAt.$gte = moment(terms.after, "YYYY-MM-DD").startOf('day').toDate();
    }

    if (terms.before) {
      createdAt.$lt = moment(terms.before, "YYYY-MM-DD").endOf('day').toDate();
    }

    if (!_.isEmpty(createdAt)) {
      parameters.find.createdAt = createdAt;
    }

  }

  return parameters;
}
Telescope.callbacks.add("stockalertsParameters", addTimeParameter);

// limit the number of items that can be requested at once
function limitStockalerts (parameters, terms) {
  var maxLimit = 2000;
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
Telescope.callbacks.add("stockalertsParameters", limitStockalerts);

