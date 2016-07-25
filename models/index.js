/**
 * Created by hamid on 7/22/16.
 */
var mongoose = require("mongoose");
const config = require('../config');
mongoose.connect(config.dbAddress);