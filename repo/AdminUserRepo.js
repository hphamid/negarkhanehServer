/**
 * Created by hamid on 7/25/16.
 */
const AdminUser = "../models/AdminUser";
module.exports.findByUserName = function(userName){
    return new Promise(function(resolve, reject){
        AdminUser.findOne({
            userName: username
        }).exec(function(err, result){
            if(err) return reject(err);
            return result;
        });
    });
};

module.exports.findById = function(userAdminId){
    return new Promise(function(resolve, reject){
        AdminUser.findOne({
            _id: userAdminId
        }).exec(function(err, result){
            if(err) return reject(err);
            return result;
        });
    });
};