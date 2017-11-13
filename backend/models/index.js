var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || "development";
var dbConfig = require(path.join(__dirname, '..', 'config', 'dbConfig.json'))[env];

if (process.env.DATABASE_URL) {
    var sequelize = new Sequelize(process.env.DATABASE_URL, dbConfig);
} else {
    var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

var db = {};
const exceptFileList = ['index.js', 'chat.js'];

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf(".") !== 0) && !exceptFileList.includes(file);//(file !== "index.js");
    })
    .forEach((file) => {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    })

Object.keys(db).forEach((modelName) => {
    if ("associate" in db[modelName]) {
       db[modelName].associate(db); 
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;