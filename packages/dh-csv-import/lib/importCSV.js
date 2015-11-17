var fsExists = Npm.require('fs-exists');
var fs = Npm.require('fs-extra');
var fileName = process.env.HOME + '/import/import.csv';

var getFirstAdminUser = function() {
    return Users.adminUsers({
        sort: {
            createdAt: 1
        },
        limit: 1
    })[0];
};

fetchCSV = function() {
    fsExists(fileName, Meteor.bindEnvironment(function(err, result) {
        if (result) {
            CSV.readCsvFileLineByLine(fileName, {
                headers: true,
                delimiter: ","
            }, Meteor.bindEnvironment(function(line) {
                // Need to put Categories lookup in here
                var userId = !!line.userId ? line.userId : getFirstAdminUser()._id;
                try {
                    var post = {
                        title: line.title,
                        userId: userId
                    };

                    if (line.body)
                        post.body = line.body;

                    try {
                        Posts.submit(post);
                    }
                    catch (error) {
                        // catch errors so they don't stop the loop
                        Telescope.log(error);
                    }
                }
                catch (error) {
                    console.log(error);
                    return true; // just go to next CSV URL
                }
            }));
            fs.move(fileName, process.env.HOME + '/imported/' + new Date() + "/imported.csv", function (err) {
              if (err) return Telescope.log(err)
            //   console.log("success!");
            });
        }
    }));

};

Meteor.methods({
    fetchCSV: function() {
        fetchCSV();
    }
});
