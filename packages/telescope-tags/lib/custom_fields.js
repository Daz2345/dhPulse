Posts.addField(
  {
    fieldName: 'categories',
    fieldSchema: {
      type: [String],
      optional: true,
      editableBy: ["member", "admin"],
      autoform: {
        noselect: true,
// <<<<<<< HEAD
        type: "select-checkbox-inline",
// =======
//         type: "bootstrap-category",
// // >>>>>>> 4a664538ff96230b1e5b1c87ef948bb164364aab
        options: function () {
          var categories = Categories.find().map(function (category) {
            return {
              value: category._id,
              label: category.name
            };
          });
          return categories;
        }
      }
    }
  }
);
