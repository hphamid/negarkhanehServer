/**
 * Created by hamid on 7/22/16.
 */
const Image = require("../models/image");

module.exports.popular = function (start, count) {
    return new Promise(function (resolve, reject) {
        Image.
        find({
            released: true
        }).skip(start)
            .limit(count)
            .sort({likeCount: -1})
            .exec(function (err, doc) {
                if (err) return reject(err);
                return resolve(doc);
            });
    });
};
module.exports.new = function (start, count) {
    return new Promise(function (resolve, reject) {
        Image.
        find({
            released: true
        }).skip(start)
            .limit(count)
            .sort({creationDate: -1})
            .exec(function (err, doc) {
                if (err) return reject(err);
                return resolve(doc);
            });
    });
};

module.exports.notReleased = function (start, count) {
    return new Promise(function (resolve, reject) {
        Image.
        find({
            released: false
        }).skip(start)
            .limit(count)
            .sort({creationDate: -1})
            .exec(function (err, doc) {
                if (err) return reject(err);
                return resolve(doc);
            });
    });
};
module.exports.byIds = function (ids) {
    return new Promise(function (resolve, reject) {
        if (!ids) reject("not found!");
        Image.
        find({
            '_id': {$in: ids}
        }).exec(function (err, doc) {
            if (err) return reject(err);
            return resolve(doc);
        });
    });
};

module.exports.byId = function (id) {
    return new Promise(function (resolve, reject) {
        if (!id) reject("image not found");
        Image.findOne({
            _id: id + ""
        }).exec(function(err, data){
            if(err) return reject(err);
            return resolve(data);
        })
    });
};

module.exports.byCategory = function (start, count, category) {
    return new Promise(function (resolve, reject) {
        Image.
        find({
            categories: category,
            released: true
        }).skip(start)
            .limit(count)
            .sort({creationDate: -1})
            .exec(function (err, doc) {
                if (err) return reject(err);
                return resolve(doc);
            });
    });
};

module.exports.addNewImage = function (name, path, released) {
    return new Promise(function (resolve, reject) {
        var newImage = new Image({
            name: name, likeCount: 0,
            released: released,
            path: path
        });
        newImage.save(function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });

};

module.exports.incrementLikeCount = function (imageId) {
    return new Promise(function (resolve, reject) {
        Image.findOneAndUpdate({
            _id: imageId
        }, {
            $inc: { likeCount: 1 }
        }).exec(function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });
};

module.exports.decrementLikeCount = function (imageId) {
    return new Promise(function (resolve, reject) {
        Image.findOneAndUpdate({
            _id: imageId
        }, {
            $inc: { likeCount: -1 }
        }).exec(function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        })
    });
};

module.exports.setReleased = function(imageId, released){
    return new Promise(function(resolve, reject){
        Image.findOneAndUpdate({
            _id: imageId
        }, {
            released: released
        }).exec(function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        })
    });
};

module.exports.rename = function(imageId, name){
    return new Promise(function(resolve, reject){
        Image.findOneAndUpdate({
            _id: imageId
        }, {
            name: name
        }).exec(function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        })
    });
};