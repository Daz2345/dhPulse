Package.describe({
  summary: 'dunnhumby d3 viz package',
  version: '0.1.0',
  name: 'dh:d3'
});

Package.onUse(function (api) {

  var packages = [
    'dh:chart'
  ];

  api.use(packages);
  api.imply(packages);

  // ---------------------------------- 2. Files to include ----------------------------------

  // client & server

  api.addFiles([
    'lib/custom_fields.js',
  ], ['client', 'server']);

  // client

  api.addFiles([
    'lib/client/templates/d3.html',
    'lib/client/templates/d3.js',
    'lib/client/templates/bundle.js',
    'lib/client/templates/boxplot.js',
    'lib/client/templates/chord.js',
    'lib/client/templates/circle.js',    
    'lib/client/templates/circularHeatmap.js',    
    'lib/client/templates/sunburst.js',        
    'lib/client/templates/sankey.js',        
    'lib/client/templates/dendogram.js',  
    'lib/client/templates/treemap.js',    
    'lib/client/templates/force.js',   
    'lib/client/templates/parallel.js', 
    'lib/client/templates/parallelsets.js',    
    'lib/client/templates/matrix.js',   
    'lib/client/stylesheets/custom.scss'
  ], ['client']);

});
