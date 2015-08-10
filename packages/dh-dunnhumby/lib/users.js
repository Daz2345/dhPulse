/**
 * Check if a user is a dunnhumby
 * @param {Object|string} userOrUserId - The user or their userId
 */
Users.is.dunnhumby = function (userOrUserId) {
  try {
    var user = Users.getUser(userOrUserId);
    return !!user && !!user.isdunnhumby;
  } catch (e) {
    return false; // user not logged in
  }
};
Users.is.dunnhumbyById = Users.is.dunnhumby;

Users.updatedunnhumby = function (userId, dunnhumby) {
  Users.update(userId, {$set: {isdunnhumby: dunnhumby}});
};