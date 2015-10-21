// Custom User Fields

Users.addField({
  fieldName: 'isdunnhumby',
  fieldSchema: {
    type: Boolean,
    optional: true,
    editableBy: ["admin"],
    autoform: {    
    group: 'dunnhumby'
    }
  }
});

Users.addField({
  fieldName: 'categories',
  fieldSchema: {
    type: [String],
    optional: true,
    editableBy: ["dunnhumby", "admin"],
    autoform: {
      type: "select-checkbox-inline",      
      group: 'dunnhumby',      
      noselect: true,
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
});