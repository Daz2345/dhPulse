Posts.addField({
  fieldName: 'd3Viz',
  fieldSchema: {
    type: Boolean,
    optional: true,
    label: 'Include d3 Visualisation?',
    autoform: {
      group: 'd3',
      type: "boolean-radios",
      trueLabel: "Yes",
      falseLabel: "No"
    },
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'd3Title',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
      group: 'd3',
      label: 'Title'
    },
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'd3Type',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
      group: 'd3',
      label: 'Viz Type'
    },
    allowedValues: [
      "Circle",
      "Chord",
      "Dendogram",
      "Force",
      "Matrix",
      "Sunburst",
      "Sankey",
      "Treemap"
    ],
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'd3Data',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
      group: 'd3',
      label: 'Data',
      rows: 10
    },
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'd3Description',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
      group: 'd3',
      label: 'Description'
    },
    editableBy: ["member", "admin"]
  }
});