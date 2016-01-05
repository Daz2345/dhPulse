// Custom Post Field

Posts.addField({
  fieldName: 'postType',
  fieldSchema: {
    type: String,
    optional: true,
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