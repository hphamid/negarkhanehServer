/**
 * Created by hamid on 7/22/16.
 */
const User = require("../models/User");

function getByUniqueId(uniqueId){
    return new Promise(function(resolve, reject){
       User.findOne({
           uniqueId: uniqueId
       }).exec(function(error, result){
           if(error) return reject(error);
           resolve(result);
       });
    });
}

module.exports.byId = function (id){
    return new Promise(function(resolve, reject){
        User.findOne({
            _id: id
        }).exec(function(error, result){
            if(error) return reject(error);
            resolve(result);
        })
    })
}

module.exports.byUniqueId = getByUniqueId;

module.exports.newUser = function(uniqueId){
    return getByUniqueId(uniqueId).then(function(result){
        if(result) return result;
        return new Promise(function(resolve, reject){
            var user = new User({uniqueId:uniqueId});
            user.save(function(error, result){
                if(error) return reject(error);
                resolve(result);
            });
        });
    });
};
