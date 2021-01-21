/**
 * Functions to create an asserts for the req body when an user login
 * or when an user register. It does check if the password, the email or the username
 * is a valid form
 * */
exports.verifyEmail = function (email) {
    if(!email) return false;
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(email);
}

exports.verifyUsername = function (username) {
    if(!username) return false;
    const regExp = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    return regExp.test(username);
}

exports.verifyPassword = function (password) {
    if(!password) return false;
    return password.length >= 8;
}