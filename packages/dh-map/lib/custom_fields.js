Posts.addField({
  fieldName: 'heatMapTitle',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
         group: 'heatMap',
         label: 'Map Title'
    },        
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'heatMapData',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
         group: 'heatMap',
         label: 'Heat Map Data',
         rows: 10
    },        
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'heatMapDescription',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
         group: 'heatMap',
         label: 'Description',
         rows : 10,         
    },        
    editableBy: ["member", "admin"]
  }
});