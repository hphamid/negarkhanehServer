/**
 * Created by hamid on 7/24/16.
 */

const ImageRepo = require("../repo/ImageRepo");
const ImageItemResponse = require("../responses/ImageItemResponse");
const ImageLikeRepo = require("../repo/ImageLikeRepo");

module.exports.popular = function(start, count, userId){
    start = Math.max(start, 0);
    count = Math.min(Math.abs(count), 20);
    return ImageRepo.popular(start, count).then(function(data){
        return makeImageResponses(data, userId);
    });
};

module.exports.new = function(start, count, userId){
    start = Math.max(start, 0);
    count = Math.min(Math.abs(count), 20);
    return ImageRepo.new(start, count).then(function(data){
        return makeImageResponses(data, userId);
    });
};

module.exports.notReleased = function(start, count, userId){
    start = Math.max(start, 0);
    count = Math.min(Math.abs(count), 20);
    return ImageRepo.notReleased(start, count).then(function(data){
        return makeImageResponses(data, userId);
    });
};

module.exports.userFavImages = function(start, count, userId){
    start = Math.max(start, 0);
    count = Math.min(Math.abs(count), 20);
    var likes = null;
    return ImageLikeRepo.getUserFavImages(start, count, userId).then(function(data){
        likes = data;
        if(!data) return false;
        var imageIds = [];
        for(var i = 0; i < data.length; i++){
            imageIds.push(data[i].imageId);
        }
        return ImageRepo.byIds(imageIds);
    }).then(function(data){
        return makeImageResponseWithLikes(data, likes);
    });
};

module.exports.makeImageResponse = makeImageResponses;
module.exports.makeImageResponseWithLikes = makeImageResponseWithLikes;

module.exports.getImageById = function(imageId, userId){
    var imageItem;
    return ImageRepo.byId(imageId).then(function(data){
        if(!data) throw "image not found";
        imageItem = data;
        return ImageLikeRepo.getLike(userId, imageId);
    }).then(function(data){
        return makeImageResponseForItem(imageItem, data);
    });
};
function getLikeItemOfMovie(likeItems, imageId){
    if(likeItems != null){
        return likeItems[imageId];
    }
    return undefined;
}

function makeImageResponses(imageItems, userId){
    return getUserLikesOfImages(imageItems, userId)
        .then(function(data){
            return makeImageResponseWithLikes(imageItems, data);
    });
}

function hashLikes(likeItems){
    var toReturn = {};

    if(!likeItems || likeItems.length <= 0){
        return toReturn;
    }
    for(var i = 0; i < likeItems.length; i++){
        toReturn[likeItems[i].imageId] = likeItems[i];
    }
    return toReturn;
}

function makeImageResponseWithLikes(imageItems, likeItems){
    var toReturn = [];
    if(imageItems == null){
        return;
    }
    var hashedLikes = hashLikes(likeItems);
    for(var i = 0; i < imageItems.length; i++){
        var itemToAdd = makeImageResponseForItem(imageItems[i],
            getLikeItemOfMovie(hashedLikes, imageItems[i]._id));
        toReturn.push(itemToAdd);
    }
    return toReturn;
}
function makeImageResponseForItem(imageItem, likeItem){
    return new ImageItemResponse(imageItem, likeItem);
}

function getUserLikesOfImages(imageList, userId){
    var imageIds = [];
    if(imageList == null){
        return [];
    }
    for(var i = 0; i < imageList.length; i++){
        imageIds.push(imageList[i]._id);
    }
    return ImageLikeRepo.getUserLikesOfImages(userId, imageIds);
}