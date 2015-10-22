var getRoute = function () {
  FlowRouter.watchPathChange()
  var categoryName = this.data.slug;
  var currentQuery = _.clone(FlowRouter.current().queryParams);
  var newQuery = _.extend(currentQuery, {cat: categoryName});
  return FlowRouter.path("postsDefault", FlowRouter.current().params, newQuery);
};

Meteor.startup(function () {
  Template.categories_menu.helpers({
    hasCategories: function () {
      return Categories.find().count();
    },
    menuLabel: function () {
      return i18n.t("categories");
    },
    menuItems: function () {

      var activeCategories = FlowRouter.getQueryParam("cat");

      var defaultItem = [{
        route: "postsDefault",
        label: i18n.t("all_categories"),
        itemClass: "item-never-active",
        template: "defaultMenuItem"
      }];

      // var menuItems = _.map(Categories.find({}, {sort: {order: 1, name: 1}}).fetch(), function (category) {
    // var userLoggedIn = (Meteor.user() !== null) ? true : this.userLoggedIn;    
    // var userCats = (userLoggedIn) ? Meteor.user().categories : "";
    // var menuItems = _.map(Categories.find({_id: {$in : userCats}}, {sort: {name: 1}}).fetch(), function (category) {          

      var menuItems = Categories.find({}, {sort: {order: 1, name: 1}}).fetch();

      // filter out categories with no items
      if (Settings.get("hideEmptyCategories", false)) {
        menuItems = _.filter(menuItems, function (category){
          return !!Counts.get(category.getCounterName());
        });
      }

      menuItems = _.map(menuItems, function (category) {

        // if any of this category's children are included in the active categories, expand it
        var isExpanded = _.intersection(activeCategories, _.pluck(category.getChildren(), "slug")).length > 0;

        // is this category active?
        var isActive = _.contains(activeCategories, category.slug);

        return {
          route: getRoute,
          label: category.name+=" <span class=\"category-posts-count\">("+Counts.get(category.getCounterName())+")</span>",
          description: category.description,
          _id: category._id,
          parentId: category.parentId,
          isExpanded: isExpanded,
          isActive: isActive,
          itemClass: "category-"+category.slug,
          data: category
        };
      });

      return defaultItem.concat(menuItems);
    },
    startPosition: function () {
      if (this.zone === "mobileNav") {
        return "collapsed";
      } else {
        return "expanded";
      }
    },
    menuClass: function () {
      if (this.zone === "mobileNav") {
        return 'menu-collapsible';
      } else if (Settings.get('navLayout', 'top-nav') === 'top-nav') {
        return 'menu-dropdown';
      } else {
        return 'menu-collapsible';
      }
    }
  });
});
