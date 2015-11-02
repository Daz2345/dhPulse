// Incomplete chart schema - need to create chart object to show many charts!!

// Telescope.schemas.chartSchema = new SimpleSchema({
//   "charts.$": {
//     type: [Object]
//   },
//   "charts.$.Title": {
//     type: String,
//     optional: true,
//     autoform: {
//         group: 'chart',
//         label: 'Title'
//     },        
//     editableBy: ["member", "admin"]
//   },
//   "charts.$.chartType": {
//     type: String,
//     optional: true,
//     autoform: {
//         group: 'chart',
//         label: 'Chart Type'
//     },
//     allowedValues: [
//             "Line",
//             "Bar",
//             "Column",
//             "Spline",
//             "Step",
//             "Area",
//             "Area-Spline",
//             "Area-Step",
//             "Scatter",
//             "Pie",
//             "Donut",
//             "Gauge"],
//     editableBy: ["member", "admin"]
//   },
//   "charts.$.chartData": {
//     type: String,
//     optional: true,
//     autoform: {
//         group: 'chart',
//         label: 'Chart Data',
//         rows: 10
//     },        
//     editableBy: ["member", "admin"]
//   },
//   "charts.$.chartXaxisType": {
//     type: String,
//     autoform: {
//         group: 'chart',
//         label: 'X Axis Type'
//     },
//     allowedValues: [
//           "timeseries",
//           "category",
//           "indexed"],
//     optional: true,
//     editableBy: ["member", "admin"]
//   },  
//   "charts.$.chartXaxisCategories": {
//     type: String,
//     autoform: {
//         group: 'chart',
//         label: 'X Axis Categories',
//         rows: 10
//     },
//     optional: true,
//     editableBy: ["member", "admin"]
//   },
//   "charts.$.showSubChart": {
//     type: Boolean,
//     label: 'Show sub-chart underneath main chart',    
//     autoform: {
//         type: "boolean-checkbox",      
//         group: 'chart'
//     },
//     optional: true,
//     editableBy: ["member", "admin"]
//   },
//   "charts.$.chartYaxisFormat": {
//     type: String,
//     autoform: {
//         group: 'chart',
//         label: 'Y Axis Format'
//     },
//     optional: true,
//     editableBy: ["member", "admin"]
//   },
//   "charts.$.chartDescription": {
//     type: String,
//     optional: true,
//     autoform: {
//         group: 'chart',
//         label: 'Description'
//     },        
//     editableBy: ["member", "admin"]
//   }
// });

// Posts.addField({
//   fieldName: 'chart',
//   type: [Telescope.schemas.chartSchema],
//   optional: true,
//   editableBy: ["member", "admin"]
// });








Posts.addField({
  fieldName: 'chart',
  fieldSchema: {
    type: Boolean,
    optional: true,
    label: 'Include Chart?',      
    autoform: {
        group: 'chart',
        type: "boolean-checkbox",
        // trueLabel: "Yes",
        // falseLabel: "No",
        firstOption: "(Please Choose a Response)"        
    },        
    editableBy: ["member", "admin"]
  }
});


Posts.addField({
  fieldName: 'chartTitle',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
        group: 'chart',
        label: 'Title'
    },        
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'chartType',
  fieldSchema: {
    type: String,
    optional: true,    
    autoform: {
        group: 'chart',
        label: 'Chart Type'
    },
    allowedValues: [
            "Area",
            "Area-Spline",
            "Area-Step",
            "Bar",
            "Stacked Bar",
            "Column",
            "Stacked Column",
            "Donut",
            "Gauge",            
            "Line",
            "Pie",            
            "Scatter",
            "Spline",
            "Step"],
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'chartData',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
        group: 'chart',
        label: 'Chart Data',
        rows: 10
    },        
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'chartColours',
  fieldSchema: {
    type: String,
    autoform: {
        group: 'chart',
        label: 'Colours'
    },
    optional: true,
    editableBy: ["member", "admin"]
  }
});

// Posts.addField({
//   fieldName: 'chartColours',
//   fieldSchema: {
//     type: [String],
//     optional: true,
//     autoform: {
//         group: 'chart',
//         type: 'bootstrap-minicolors',
//         label: 'Chart Colours'
//     },        
//     editableBy: ["member", "admin"]
//   }
// });

Posts.addField({
  fieldName: 'chartXaxisType',
  fieldSchema: {
    type: String,
    autoform: {
        group: 'chart',
        label: 'Axis Type'
    },
    allowedValues: [
          "timeseries",
          "category",
          "indexed"],
    optional: true,
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'chartXaxisCategories',
  fieldSchema: {
    type: String,
    autoform: {
        group: 'chart',
        label: 'Categories',
        rows: 10
    },
    optional: true,
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'showSubChart',
  fieldSchema: {
    type: Boolean,
    label: 'Show sub-chart',    
    autoform: {
        type: "boolean-checkbox",      
        group: 'chart',
        leftLabel: 'Sub Chart'
    },
    optional: true,
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'chartYaxisFormat',
  fieldSchema: {
    type: String,
    autoform: {
        group: 'chart',
        label: 'Y Axis Format'
    },
    optional: true,
    editableBy: ["member", "admin"]
  }
});

Posts.addField({
  fieldName: 'chartDescription',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
        group: 'chart',
        label: 'Description'
    },        
    editableBy: ["member", "admin"]
  }
});
