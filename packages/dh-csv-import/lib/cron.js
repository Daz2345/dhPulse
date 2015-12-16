var addJobImportCSV = function() {
    SyncedCron.add({
        name: 'Import Post CSV',
        schedule: function(parser) {
            return parser.text('every 30 seconds');
        },
        job: function() {
            fetchPostCSV();
        }
    });
};

Meteor.startup(function() {
    addJobImportCSV();
});