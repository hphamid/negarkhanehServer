/**
 * Created by hamid on 7/25/16.
 */
const UserRepo = require('../repo/UserRepo');

module.exports = function (app) {
    //userid filter
    app.use("/api", function (req, res, next) {
        var userId = req.get("UserId");
        if (!userId) {
            res.status(400);
            res.send('Bad request!');
        } else {
            UserRepo.byId(userId).then(function(data){
                req.userId = userId;
                req.requestUser = data;
                next();
            }).catch(function(error){
                res.status(400);
                res.send('Bad request!');
            });
        }

    });
};