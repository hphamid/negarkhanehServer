/**
 * Created by hamid on 7/21/16.
 */
var mongoose = require("mongoose");

var imageSchema = mongoose.Schema({
    name: String,
    path: String,
    likeCount:  Number,
    categories: [String],
    released: Boolean,
    creationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Image", imageSchema);
