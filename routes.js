/**
 * Created by hamid on 7/25/16.
 */
const AdminControllers = require('./controller/AdminControllers');
const UserControllers = require('./controller/UserControllers');

module.exports = function(app){
    UserControllers(app);
    AdminControllers(app);
};
