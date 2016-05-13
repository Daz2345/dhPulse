// limit the post categories to those that the user has pemission to see
function userCategories (parameters, terms) {

  if (terms.userId) {
    var categoriesIds = [];
    var find = {};
    var userCats = Users.getCategoriesById(terms.userId);

  if (typeof userCats !== 'undefined' && userCats.length !== 0) {

    if (userCats.length === 1) { // One Category
      find = {"_id": userCats[0]};
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
  }
  return parameters;
}
// Telescope.callbacks.remove("postsParameters", addCategoryParameter);
Telescope.callbacks.add("postsParameters", userCategories);


// function addCategoryIntersectionParameter (parameters, terms) {
//   // filter by category if category slugs are provided
//   if (!!terms.cat) {

//     var categoriesIds = [];
//     var find = {};

//     if (typeof terms.cat === "string") { // cat is a string
//       find = {slug: terms.cat};
//     } else { // cat is an array
//       find = {slug: {$in: terms.cat}};
//     }

//     // get all categories passed in terms
//     var categories = Categories.find(find).fetch();

//     var categoriesIds = _.pluck(categories, "_id");

//     parameters.find.categories = {$all: categoriesIds};
//   }
//   return parameters;
// }
// Telescope.callbacks.add("postsParameters", addCategoryIntersectionParameter);

function addCategoryParameter (parameters, terms) {

  var cat = terms.cat || terms["cat[]"];

  // filter by category if category slugs are provided
  if (cat) {

    var categoriesIds = [];
    var find = {};
    
    if (typeof cat === "string") { // cat is a string
      find = {slug: cat};
    } else if (Array.isArray(cat)) { // cat is an array
      find = {slug: {$in: cat}};
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
Telescope.callbacks.add("postsParameters", addCategoryParameter);

// limit the post categories to those that the user has pemission to see
function userAudienceGroup (parameters, terms) {

  if (terms.userId) {
    var audienceGroups = [];
    // var find = {};
    var audienceGroups = Users.getAudienceGroupById(terms.userId);
    // If user is dh employee then do nothing otherwise filter by user audience groups
    var isDunnhumby = Users.is.dunnhumbyById(terms.userId);
    
  if (typeof audienceGroups !== 'undefined' && audienceGroups.length !== 0 && !isDunnhumby) {

    // if (audienceGroups.length === 1) { // One Category
    //   find = audienceGroups[0];
    // } else { // cat is an array
    //   find = {$in : audienceGroups};
    // }

      parameters.find.audienceGroup = {$in: audienceGroups};
    
  }
  }
  return parameters;
}
// Telescope.callbacks.remove("postsParameters", addCategoryParameter);
Telescope.callbacks.add("postsParameters", userAudienceGroup);