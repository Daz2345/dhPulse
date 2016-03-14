Users.updatedunnhumby = function (userId, dunnhumby) {
  Users.update(userId, {$set: {isdunnhumby: dunnhumby}});
};

AccountsTemplates.removeField('password');
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    placeholder: {
        signUp: "At least eight characters"
    },
    required: true,
    minLength: 8,
    re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
    errStr: 'At least 1 digit, 1 lowercase and 1 uppercase',
});