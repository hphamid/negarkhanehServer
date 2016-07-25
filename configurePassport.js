/**
 * Created by hamid on 7/25/16.
 */
const passport = require('passport');
const PassportLocal = require('passport-local');
const AdminUserRepo = require('./repo/AdminUserRepo');
// must configure body parser, cookie parser and session before calling this function.
passport.use(new PassportLocal(function (userName, password, done) {
    AdminUserRepo.findByUserName(userName).then(function (result) {
        if (!result) {
            done(result);
        }
        if(result.validatePassword(password)){
            done(result);
        }else{
            done(null, false);
        }
    }).catch( function(error){
        done(error, false);
    });
}));
passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    AdminUserRepo.findById(id).then(function(err, user) {
        done(err, user);
    });
});
module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
};
