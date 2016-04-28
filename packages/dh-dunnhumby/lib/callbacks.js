// function addAudienceGroupOnSubmit (post) {

//   var audienceGroup = post.audienceGroup;
//   // var newCategories = [];
//   // if (audienceGroup) {
//   //   audienceGroup.forEach(function (audience) {
//   //     newCategories.push(audience);
//   //   });
//   // }
//   post.audienceGroup = [audienceGroup];
//   return post;
// }
// Telescope.callbacks.add("postSubmitClient", addAudienceGroupOnSubmit);

// function addParentCategoriesOnEdit (modifier, post) {
//   if (modifier.$unset && modifier.$unset.categories !== undefined) {
//     return modifier;
//   }

//   var categories = modifier.$set.categories;
//   var newCategories = [];
//   if (categories) {
//     categories.forEach(function (categoryId) {
//       var category = Categories.findOne(categoryId);
//       newCategories = newCategories.concat(_.pluck(category.getParents().reverse(), "_id"));
//       newCategories.push(category._id);
//     });
//   }
//   modifier.$set.audienceGroup = _.unique(newCategories);
//   return modifier;
// }

// Telescope.callbacks.add("postEditClient", addAudienceGroupOnSubmit);

// Need to complete this as it no work for editing!!!