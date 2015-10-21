// ------------------------------------------------------------------------------------------- //
// -----------------------------------------  Posts ------------------------------------------ //
// ------------------------------------------------------------------------------------------- //

// add new post Push callback on post submit
function postSubmitPush(post) {

    var pushData = {
        post: _.pick(post, '_id', 'userId', 'title', 'url', 'sendNotification')
    };

    if (post.sendNotification) {
        var adminIds = _.pluck(Users.find({
            'isAdmin': true
        }, {
            fields: {
                _id: 1
            }
        }).fetch(), '_id');
        var notifiedUserIds = _.pluck(Users.find({
            'telescope.notifications.posts': true,
            categories: post.categories
        }, {
            fields: {
                _id: 1
            }
        }).fetch(), '_id');

        // remove post author ID from arrays
        adminIds = _.without(adminIds, post.userId);
        notifiedUserIds = _.without(notifiedUserIds, post.userId);

        if (post.status === Posts.config.STATUS_PENDING && !!adminIds.length) {
            // if post is pending, only notify admins
            // Herald.createPush(adminIds, {courier: 'newPendingPost', data: pushData});
            Meteor.call("serverNotification", 'A new post has been submitted', pushData.post.title, notifiedUserIds);
        }
        else if (!!notifiedUserIds.length) {
            // if post is approved, notify everybody
            // Herald.createPush(notifiedUserIds, {courier: 'newPost', data: pushData});
            Meteor.call("serverNotification", 'A new post has been submitted', pushData.post.title, notifiedUserIds);
        }
    }
}
Telescope.callbacks.add("postSubmitAsync", postSubmitPush);

function postApprovedPush(post) {

    var pushData = {
        post: _.pick(post, '_id', 'userId', 'title', 'url')
    };

    //   Herald.createPush(post.userId, {courier: 'postApproved', data: pushData});
    Meteor.call("serverNotification", 'A new post has been approved', pushData.post.title, post.userId);
}
Telescope.callbacks.add("postApprovedAsync", postApprovedPush);

// ------------------------------------------------------------------------------------------- //
// ---------------------------------------- Comments ----------------------------------------- //
// ------------------------------------------------------------------------------------------- //

// add new comment Push callback on comment submit
function commentSubmitPush(comment) {

    // note: dummy content has disablePushs set to true
    if (Meteor.isServer && !comment.disablePushs) {

        var post = Posts.findOne(comment.postId),
            postAuthor = Users.findOne(post.userId),
            userIdsNotified = [],
            pushData = {
                comment: _.pick(comment, '_id', 'userId', 'author', 'htmlBody'),
                post: _.pick(post, '_id', 'userId', 'title', 'url')
            };


        // 1. Notify author of post (if they have new comment Pushs turned on)
        //    but do not notify author of post if they're the ones posting the comment
        if (Users.getSetting(postAuthor, "Pushs.comments", true) && comment.userId !== postAuthor._id) {
            // Herald.createPush(post.userId, {courier: 'newComment', data: pushData});
            userIdsNotified.push(post.userId);
            Meteor.call("serverNotification", 'New Comment', pushData.post.title, post.userId);
        }

        // 2. Notify author of comment being replied to
        if (!!comment.parentCommentId) {

            var parentComment = Comments.findOne(comment.parentCommentId);

            // do not notify author of parent comment if they're also post author or comment author
            // (someone could be replying to their own comment)
            if (parentComment.userId !== post.userId && parentComment.userId !== comment.userId) {

                var parentCommentAuthor = Users.findOne(parentComment.userId);

                // do not notify parent comment author if they have reply Pushs turned off
                if (Users.getSetting(parentCommentAuthor, "Pushs.replies", true)) {

                    // add parent comment to Push data
                    pushData.parentComment = _.pick(parentComment, '_id', 'userId', 'author', 'htmlBody');

                    // Herald.createPush(parentComment.userId, {courier: 'newReply', data: pushData});
                    userIdsNotified.push(parentComment.userId);
                    Meteor.call("serverNotification", 'New Comment', pushData.post.title, post.userId);
                }
            }
        }

        // 3. Notify users subscribed to the thread
        // TODO: ideally this would be injected from the telescope-subscribe-to-posts package
        if (!!post.subscribers) {

            // remove userIds of users that have already been notified
            // and of comment author (they could be replying in a thread they're subscribed to)
            var subscriberIdsToNotify = _.difference(post.subscribers, userIdsNotified, [comment.userId]);
            // Herald.createPush(subscriberIdsToNotify, {courier: 'newCommentSubscribed', data: pushData});
            Meteor.call("serverNotification", 'New Comment', pushData.post.title, subscriberIdsToNotify);

            userIdsNotified = userIdsNotified.concat(subscriberIdsToNotify);
        }
    }
}
Telescope.callbacks.add("commentSubmitAsync", commentSubmitPush);
