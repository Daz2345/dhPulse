(function() {
  var CSV;

  this.c2c = {
    createCollection: function(publicCsvPath) {
      return new Meteor.Collection(this.getFilename(publicCsvPath));
    },
    getFilename: function(path) {
      return (path.split("/")).pop();
    }
  };

  if (Meteor.isServer) {
    CSV = Npm.require("comma-separated-values");
    this.c2c.addCsvStringToCollection = function(collection, csvString) {
      var doc, _i, _len, _ref, _results;
      _ref = (new CSV(csvString, {
        header: true,
        cast: false,
        line: "\n"
      })).parse();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        doc = _ref[_i];
        _results.push(collection.insert(doc));
      }
      return _results;
    };
    this.c2c.addPublicCsvToCollection = function(collection, path) {
      return this.addCsvStringToCollection(collection, String((Npm.require("fs")).readFileSync("../client/app/" + path)));
    };
  }

}).call(this);