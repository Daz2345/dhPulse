function insertCategory(element, index, array){
    Categories.insert({name: element})
}

var insertCategories = function() {
    
    var defaultCategories = [
        "Public",
        "dunnhumby"
        ];
  
    defaultCategories.forEach(insertCategory);
};



Meteor.startup(function () {
  if (!Events.findOne({name: 'insertCategories'}) && !Categories.find().count()) {
    insertCategories();
    Events.log({name: 'insertCategories', unique: true, important: true});
  }
});