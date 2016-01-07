// limit the post categories to those that the user has pemission to see
function userCategories (parameters, terms) {

    var categoriesIds = [];
    var find = {};
    var userCats = Users.getCategoriesById(terms.userId);

  if (typeof userCats !== 'undefined' && !terms.cat && userCats.length !== 0 && parameters.find.categories === 'undefined') {

    if (userCats.length === 1) { // One Category
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

// Telescope.callbacks.remove("postsParameters", "addCategoryParameter");

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