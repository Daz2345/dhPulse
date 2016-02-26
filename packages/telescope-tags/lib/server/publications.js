Meteor.publish('categories', function() {

  if (Users.can.viewById(this.userId)) {
    var userCats = Users.getCategoriesById(this.userId);

    console.log(userCats);

    if (typeof userCats !== 'undefined') {

      if (userCats.length === 1) { // One Category
        var categories = Categories.find({
          "_id": userCats[0]
        });
      }
      else { // cat is an array
        var categories = Categories.find({
          "_id": {
            $in: userCats
          }
        });
      }

    }
    else {
      var categories = Categories.find();
    }

    var publication = this;

    categories.forEach(function(category) {
      var childrenCategories = category.getChildren();
      var categoryIds = [category._id].concat(_.pluck(childrenCategories, "_id"));
      var cursor = Posts.find({
        $and: [{
          categories: {
            $in: categoryIds
          }
        }, {
          status: Posts.config.STATUS_APPROVED
        }]
      });
      Counts.publish(publication, category.getCounterName(), cursor, {
        noReady: true
      });
    });

    return categories;
  }
  return [];
});

Meteor.publish('all-categories', function() {

  // if (Users.can.viewById(this.userId)) {

  //   var categories = Categories.find();
    // var publication = this;

    // categories.forEach(function(category) {
    //   var childrenCategories = category.getChildren();
    //   var categoryIds = [category._id].concat(_.pluck(childrenCategories, "_id"));
    //   var cursor = Posts.find({
    //     $and: [{
    //       categories: {
    //         $in: categoryIds
    //       }
    //     }, {
    //       status: Posts.config.STATUS_APPROVED
    //     }]
    //   });
    //   Counts.publish(publication, category.getCounterName(), cursor, {
    //     noReady: true
    //   });
    // });

    return Categories.find();;
  // }
  // return [];
});