/**
 * Created by hamid on 7/25/16.
 */
const ImageServices = require('../services/ImageService');
const LikeService = require('../services/LikeServices');
const UserRepo = require('../repo/UserRepo');

module.exports = function(app){
    app.get("/api/new/:start/:count", function(req, res){
        ImageServices.new(req.params.start, req.params.count, req.userId).then(function(data){
            res.send(JSON.stringify(data));
        }).catch(function(error){
            res.status(500);
            res.send(error);
            throw error;
        });
    });
    app.get("/api/popular/:start/:count", function(req, res){
        ImageServices.popular(req.params.start, req.params.count, req.userId).then(function(data){
            res.send(JSON.stringify(data));
        }).catch(function(error){
            res.status(500);
            res.send(error);
            throw error;
        });
    });
    app.get("/api/favs/:start/:count", function(req, res){
        ImageServices.userFavImages(req.params.start, req.params.count, req.userId).then(function(data){
            res.send(JSON.stringify(data));
        }).catch(function(error){
            res.status(500);
            res.send(error);
            throw error;
        });
    });
    app.post("/api/like/:imageId", function(req, res){
        LikeService.likeImage(req.userId, req.params.imageId).then(function(data){
            res.send(JSON.stringify(data));
        }).catch(function(error){
            res.status(500);
            res.send(error);
        });
    });
    app.post("/api/unlike/:imageId", function(req, res){
        LikeService.unlikeImage(req.userId, req.params.imageId).then(function(data){
            res.send(JSON.stringify(data));
        }).catch(function(error){
            res.status(500);
            res.send(error);
        });
    });
    app.post("/getUser/:uniqueId", function(req, res){
        UserRepo.newUser(req.params.uniqueId).then(function(data){
            res.send(JSON.stringify(data));
        }).catch(function(error){
            res.status(500);
            res.send(error);
        });
    });
};