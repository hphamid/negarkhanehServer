/**
 * Created by hamid on 7/25/16.
 */
var fs = require("fs");
var path =  require("path");
var config = require("../config.js");
var ImageRepo = require("../repo/ImageRepo");

function getFileName(imageFile){
    return imageFile.filename + "-" + imageFile.originalname;
}
function getFinalImageFilePath(fileName){
    return path.resolve(config.finalImagePath + "/" + fileName);
}

function moveImageAndGetName(imageFile){
    var name = getFileName(imageFile);
    var path = getFinalImageFilePath(name);
    fs.renameSync(imageFile.path, path);
    return name;
}

module.exports.newImage = function(imageFile, name, released){
    return new Promise(function(resolve, reject){
        if(!imageFile) reject("image is empty");
        if(!name) reject("name is empty");
        resolve(moveImageAndGetName(imageFile));
    }).then(function(data){
        return ImageRepo.addNewImage(name, data, released);
    });
};
