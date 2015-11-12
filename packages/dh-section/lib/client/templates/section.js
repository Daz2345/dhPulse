Template.section.helpers({
    myTemplate: function() {
        return this.sectionType.toLowerCase().replace(/-/g,'').replace(/ /g,'');
    }
});