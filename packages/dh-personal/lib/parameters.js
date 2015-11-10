// limit the post categories to those that the user has pemission to see
function userCategories (parameters, terms) {

    var categoriesIds = [];
    var find = {};
    var userCats = Users.getCategoriesById(terms.userId);

  if (typeof userCats !== 'undefined' && !terms.cat ) {//&& parameters.find.categories === 'undefined') {

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