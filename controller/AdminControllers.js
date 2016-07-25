/**
 * Created by hamid on 7/25/16.
 */
const config = require("../config.js");
const multer  = require('multer');
const upload = multer({ dest: config.tempImagePath });
const ImageUploadService = require('../services/ImageUploadService');
const ImageRepo = require('../repo/ImageRepo');
const ImageService = require('../services/ImageService');
const fs = require('fs');

module.exports = function(app, passport){
    app.post("/login", passport.authenticate('local'), function(req, res){
        res.send(JSON.stringify(req.user));
    });
    app.post("/logout", function(req, res){
        req.logout();
        res.send("ok");
    });
    app.get("/admin/check", function(req, res){
        res.send(JSON.stringify(req.user));
    });
    app.post("/admin/newImage", upload.single('image') , function(req, res){
        ImageUploadService.newImage(req.file, req.body.name, req.body.released).then(function(data){
            res.send(JSON.stringify(data));
        }).catch(function(error){
            res.status(500);
            console.log(error.message);
            res.send(error);
            if(req.file){
                fs.unlinkSync(req.file.path);
            }
        });
    });
    app.post("/admin/released/:imageId", function(req, res){
        ImageRepo.setReleased(req.params.imageId, req.body.released).then(function(data){
            res.send(JSON.stringify(data));
        }).catch(function(error){
            res.status(500);
            res.send(error.message);
        });
    });

    app.post("/admin/rename/:imageId", function(req, res){
        ImageRepo.rename(req.params.imageId, req.body.name).then(function(data){
            res.send(JSON.stringify(data));
        }).catch(function(error){
            res.status(500);
            res.send(error.message);
        });
    });

    app.get("/admin/notReleased/:start/:count", function(req, res){
        ImageService.notReleased(req.params.start, req.params.count, undefined).then(function(data){
            res.send(JSON.stringify(data));
        }).catch(function(error){
            res.status(500);
            res.send(error.message);
        });
    });


};