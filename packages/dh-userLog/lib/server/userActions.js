userLog = new Mongo.Collection("userlog");


UserStatus.events.on("connectionLogin", function(fields) {
    fields.date = new Date();
    fields.eventType = 'Login';
    userLog.insert(fields)
});

UserStatus.events.on("connectionLogout", function(fields) {
    fields.date = new Date();
    fields.eventType = 'Logout';
    userLog.insert(fields)
});

UserStatus.events.on("connectionIdle", function(fields) {
    fields.date = new Date();
    fields.eventType = 'connectionIdle';
    userLog.insert(fields)
});

UserStatus.events.on("connectionActive", function(fields) {
    fields.date = new Date();
    fields.eventType = 'connectionActive';
    userLog.insert(fields)
});
