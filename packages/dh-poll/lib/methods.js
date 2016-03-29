    Telescope.voteOnPoll = function(collection, itemId, optionSelected, user) {

        user = typeof user === "undefined" ? Meteor.user() : user;

          collection.update({_id: itemId, "poll.pollOptions.Option" : optionSelected},{
            $addToSet: {"poll.pollOptions.$.Voters": user._id},
            $inc: {"poll.pollOptions.$.Count": 1}
          });

          collection.update({_id: itemId},{
            $addToSet: {"poll.pollVoters": user._id} 
          });
          
        return true;
    };

Meteor.methods({
  pollVote: function (postId, option, user) {
    check(postId, String);
    return Telescope.voteOnPoll.call(this, Posts, postId, option, user);
  }
});

