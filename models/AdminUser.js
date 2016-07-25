/**
 * Created by hamid on 7/25/16.
 */
var mongoose = require("mongoose");
var passwordHash = require('password-hash');


var AdminUserSchema = mongoose.Schema({
    userName: String,
    password: String,
    creationDate: { type: Date, default: Date.now }
});


AdminUserSchema.methods.setPassword = function(password){
    if(!password || isEmpty(password)) return;
    this.password = passwordHash.generate(password);
};

AdminUserSchema.methods.validatePassword = function(password){
    passwordHash.verify(password, this.password);
};

module.exports = mongoose.model("AdminUser", AdminUserSchema);
