/**
 * Posts schema
 * @type {SimpleSchema}
 */
API.schema = new SimpleSchema({
  /**
    Timetstamp of API key creation
  */
  createdAt: {
    type: Date,
    optional: true
  },
  /**
    The users API Key
  */
  apiKEY: {
    type: String,
    optional: true,
    editableBy: ["admin"],
    autoValue: function () {
        return Random.secret();
    }
  },
  /**
    The users ID
  */
  
  userId: {
    type: String,
    optional: true,
    editableBy: ["admin"],
    autoform: {
      group: 'admin',
      options: function () {
        return Meteor.users.find().map(function (user) {
          return {
            value: user._id,
            label: Users.getDisplayName(user)
          };
        });
      }
    }
  }
});

/**
 * Attach schema to Posts collection
 */
API.attachSchema(API.schema);

API.allow({
  update: _.partial(Telescope.allowCheck, API),
  remove: _.partial(Telescope.allowCheck, API)
});

