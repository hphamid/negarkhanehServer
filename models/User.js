/**
 * Created by hamid on 7/21/16.
 */
var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    uniqueId: String,
    creationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
