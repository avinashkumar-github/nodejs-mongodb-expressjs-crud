const dbConfig = require("./../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.url = dbConfig.url;
db.mongoose = mongoose;
db.records = require("./record.model")(mongoose);

module.exports = db;
