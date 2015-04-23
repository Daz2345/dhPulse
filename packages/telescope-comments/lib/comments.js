commentSchemaObject = {
  _id: {
    type: String,
    optional: true
  },
  parentCommentId: {
    type: String,
    optional: true,
    autoform: {
      editable: true,
      omit: true
    }
  },
  createdAt: {
    type: Date,
    optional: true
  },
  postedAt: { // for now, comments are always created and posted at the same time
    type: Date,
    optional: true
  },
  body: {
    type: String,
    autoform: {
      editable: true
    }
  },
  htmlBody: {
    type: String,
    optional: true
  },
  baseScore: {
    type: Number,
    decimal: true,
    optional: true
  },
  score: {
    type: Number,
    decimal: true,
    optional: true
  },
  upvotes: {
    type: Number,
    optional: true
  },
  upvoters: {
    type: [String], // XXX
    optional: true
  },
  downvotes: {
      type: Number,
      optional: true
  },
  downvoters: {
    type: [String], // XXX
    optional: true
  },
  author: {
    type: String,
    optional: true
  },
  inactive: {
    type: Boolean,
    optional: true
  },
  postId: {
    type: String, // XXX
    optional: true,
    autoform: {
      editable: true,
      omit: true
    }
  },
  userId: {
    type: String, // XXX
    optional: true
  },
  isDeleted: {
    type: Boolean,
    optional: true
  }
};

// add any extra properties to commentSchemaObject (provided by packages for example)
_.each(addToCommentsSchema, function(item){
  commentSchemaObject[item.propertyName] = item.propertySchema;
});

Comments = new Meteor.Collection("comments");

commentSchema = new SimpleSchema(commentSchemaObject);

Comments.attachSchema(commentSchema);

Comments.deny({
  update: function(userId, post, fieldNames) {
    if(Users.isAdminById(userId))
      return false;
    // deny the update if it contains something other than the following fields
    return (_.without(fieldNames, 'body').length > 0);
  }
});

Comments.allow({
  update: Users.can.editById,
  remove: Users.can.editById
});