/**
 * Created by hamid on 7/25/16.
 */

module.exports = function(app){
    app.use("/admin", function(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }else{
            res.status(401);
            res.send('Bad Access!!');
        }
    });
};