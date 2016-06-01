Posts.addField({
  fieldName: 'd3Viz',
  fieldSchema: {
    type: Boolean,
    optional: true,
    label: 'Include d3 Visualisation?',
    autoform: {
      group: 'd3',
      type: "boolean-checkbox"
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
      "BoxPlot",
      "Bullet - Horizontal",
      "Bullet - Vertical",
      "Bundle",
      "Circle",
      "Circular Heatmap",
      "Clustered Force Layout",
      "Chord",
      "Chord2",
      "Dendogram",
      "Force",
      "Matrix",
      "Parallel",
      "Parallel Sets",
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
  fieldName: 'd3Data2',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
      group: 'd3',
      label: 'Data2',
      rows: 10
    },
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'radialLabels',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
      group: 'd3',
      label: 'Radial Labels',
      rows: 10
    },
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'segmentLabels',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
      group: 'd3',
      label: 'Segment Labels',
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