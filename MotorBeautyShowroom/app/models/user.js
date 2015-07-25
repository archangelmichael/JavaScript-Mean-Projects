/**
 * Created by Radi on 7/22/2015.
 */
'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Create Schema
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name : String,
    username : { type : String, required : true, index : { unique : true } },
    password : { type : String, required : true, select : false }
});

// Set password hashing
UserSchema.pre('save', function (next) {
    var user = this;
    if(!user.isModified('password')) {
        return next();
    }
    else {
        bcrypt.hash(user.password, null, null, function (error, hash) {
            if (error) {
                return next(error);
            }
            else {
                user.password = hash;
                return next();
            }
        })
    }
});

// Define custom method to compare password
UserSchema.methods.comparePassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);