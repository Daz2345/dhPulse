// Custom Post Field

Posts.addField({
  fieldName: 'postType',
  fieldSchema: {
    type: String,
    autoform: {
      label: 'Post Type',
      order: 1
    },
    allowedValues: [
      "Article",
      "D3 Visual",
      "Chart",
      "Map",
      "Poll",
      "Custom"
    ],
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'starred',
  fieldSchema: {
    type: [String],
    optional: true
  }
});

Posts.addField({
  fieldName: 'audienceGroup',
  fieldSchema: {
    type: [String],
    autoform: {
      type: "select-checkbox-inline",
      group: 'dunnhumby',
      label: 'Audience Group(s)',
      options: function() {
        return [{
          value: "Tesco",
          label: "Tesco"
        }, {
          value: "Public",
          label: "Public"
        }];
      }
    },
    editableBy: ["member", "admin"]
  }
});