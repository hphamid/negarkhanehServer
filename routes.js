/**
 * Created by hamid on 7/25/16.
 */
const AdminControllers = require('./controller/AdminControllers');
const UserControllers = require('./controller/UserControllers');

module.exports = function(app, passport){
    UserControllers(app);
    AdminControllers(app, passport);
};
