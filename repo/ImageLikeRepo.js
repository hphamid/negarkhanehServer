/**
 * Created by hamid on 7/22/16.
 */
const ImageLike = require("../models/ImageLike");

module.exports.newLikeItem = function (userId, imageId) {
    return getLike(userId, imageId).then(function (result) {
        if (result) throw "like already exists";
        return new Promise(function (resolve, reject) {
            var likeItem = new ImageLike({imageId: imageId, userId: userId});
            likeItem.save(function (err, result) {
                if (err) return reject(err);
                resolve(result);
            });
        });
    });
};

module.exports.removeLike = function (userId, imageId) {
    return new Promise(function (resolve, reject) {
        ImageLike.find({
            userId: userId,
            imageId: imageId
        }).remove().exec(function(err, result){
            if(err) return reject(err);
            return resolve(result);
        });
    });
};

function getLike(userId, imageId) {
    return new Promise(function (resolve, reject) {
        ImageLike.
        findOne({
            userId: userId,
            imageId: imageId
        }).exec(function (err, doc) {
            if (err) return reject(err);
            return resolve(doc);
        });
    });
}

module.exports.getLike = getLike;
module.exports.getUserLikesOfImages = function (userId, imageIds) {
    return new Promise(function (resolve, reject) {
        ImageLike.
        find({
            userId: userId,
            imageId: {$in: imageIds}
        }).exec(function (err, doc) {
            if (err) return reject(err);
            return resolve(doc);
        });
    });
};

module.exports.getUserFavImages = function (start, count, userId) {
    return new Promise(function (resolve, reject) {
        ImageLike.find({
            userId: userId
        }).skip(start).limit(count).exec(function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });
};

module.exports.getImageLikes = function (start, count, imageId) {
    return new Promise(function (resolve, reject) {
        ImageLike.find({
            imageId: imageId
        }).skip(start).limit(count).exec(function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });
};

