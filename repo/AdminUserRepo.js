/**
 * Created by hamid on 7/25/16.
 */
const AdminUser = require("../models/AdminUser");
module.exports.findByUserName = function (userName) {
    return new Promise(function (resolve, reject) {
        AdminUser.findOne({
            userName: userName
        }).exec(function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });
};

module.exports.findById = function (userAdminId) {
    return new Promise(function (resolve, reject) {
        AdminUser.findOne({
            _id: userAdminId
        }).exec(function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });
};

module.exports.newAdmin = function (userName, password) {
    return new Promise(function (resolve, reject) {
        var user = new AdminUser({userName: userName});
        user.setPassword(password);
        user.save(function (error, data) {
            if (error) return reject(error);
            return resolve(data);
        });
    });
};