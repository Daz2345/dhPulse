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
  fieldName: 'audienceGroup',
  fieldSchema: {
    type: [String],
    autoform: {
      type: "select-checkbox-inline",
      group: 'dunnhumby',      
      label: 'Audience',
      options: function() {
        return [{
          value: "dunnhumby",
          label: "dunnhumby"
        }, {
          value: "Tesco",
          label: "Tesco"
        }, {
          value: "Public",
          label: "Public"
        }];
      }
    },
    editableBy: ["admin"]
  }
});

Users.addField({
  fieldName: 'categories',
  fieldSchema: {
    type: [String],
    optional: true,
    public: true,
    editableBy: ["dunnhumby", "admin"],
    autoform: {
      type: "select-checkbox-inline",      
      group: 'dunnhumby',      
      noselect: true,
      options: function () {
        var categories = Categories.find({},{sort:{name:1}}).map(function (category) {
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