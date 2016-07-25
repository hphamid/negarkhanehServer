/**
 * Created by hamid on 7/25/16.
 */
const UserMiddleWare = require('./middlewares/UserMiddleWares');

module.exports = function(app){
    UserMiddleWare(app);
};
