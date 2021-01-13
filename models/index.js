"use strict";
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.js"))[env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Users = require("./users")(sequelize, Sequelize);
db.Pets = require("./pets")(sequelize, Sequelize);
db.Comments = require("./comments")(sequelize, Sequelize);
db.PetsImages = require("./petsImages")(sequelize, Sequelize);

db.Users.hasMany(db.Comments, { foreignKey: { allowNull: false } });
db.Comments.belongsTo(db.Users);

db.Users.hasMany(db.Pets, { foreignKey: { allowNull: false } });
db.Pets.belongsTo(db.Users);

db.Pets.hasMany(db.Comments, { foreignKey: { allowNull: false } });
db.Comments.belongsTo(db.Pets);

db.Pets.hasMany(db.PetsImages, { foreignKey: { allowNull: false } });
db.PetsImages.belongsTo(db.Pets);

module.exports = db;
