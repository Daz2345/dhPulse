Template.d3.helpers({
    myTemplate: function() {
        return this.d3Type.toLowerCase().replace(/-/g,'').replace(/ /g,'');
    }
});