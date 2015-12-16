Stockalerts._ensureIndex({"createdAt": 1});

// Publish a list of posts

Meteor.publish('stockalerts', function(terms) {

  terms.userId = this.userId; // add userId to terms
  
  if(Users.can.viewById(this.userId)){
    var parameters = Stockalerts.parameters.get(terms),
        stockalerts = Stockalerts.find(parameters.find, parameters.options);

    return stockalerts;
  }
  return [];
});