var addJobImportCSV = function() {
    SyncedCron.add({
        name: 'Import CSV',
        schedule: function(parser) {
            return parser.text('every 30 seconds');
        },
        job: function() {
            fetchCSV();
        }
    });
};

Meteor.startup(function() {
    addJobImportCSV();
});