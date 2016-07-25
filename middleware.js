/**
 * Created by hamid on 7/25/16.
 */
const UserMiddleWare = require('./middlewares/UserMiddleWares');
const AdminMiddleWares = require('./middlewares/AdminMiddleWares');

module.exports = function(app, passport){
    UserMiddleWare(app);
    AdminMiddleWares(app);
};
