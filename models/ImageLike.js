/**
 * Created by hamid on 7/21/16.
 */
var mongoose = require("mongoose");

var imageLikeSchema = mongoose.Schema({
    imageId: String,
    userId: String,
    creationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ImageLike", imageLikeSchema);
