/**
 * Created by hamid on 7/22/16.
 */
const imageLikeRepo = require("../repo/ImageLikeRepo");
const imageRepo = require("../repo/ImageRepo");

module.exports.likeImage = function(userId, imageId){
    return imageRepo.byId(imageId).then(function(data){
        if(!data) throw "image not found";
        return imageLikeRepo.newLikeItem(userId, imageId).then(function(data){
            if(!data) return false;
            return imageRepo.incrementLikeCount(imageId).then(function(data){
                return "ok";
            });
        });
    });
};

module.exports.unlikeImage = function(userId, imageId){
    return imageLikeRepo.removeLike(userId, imageId).then(function(data){
        if(!data) return false;
        return imageRepo.decrementLikeCount(imageId).then(function(data){
            return "ok";
        });
    });
};