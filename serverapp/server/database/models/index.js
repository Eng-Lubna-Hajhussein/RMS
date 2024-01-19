const { DATABASE, USER, PASSWORD, HOST, DIALECT } = require("./../config/config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
});

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.tblUser = require("./tblUser/tblUser")(sequelize, Sequelize.DataTypes);
db.models.tblSystem = require("./tblSystem/tblSystem")(sequelize, Sequelize.DataTypes);
db.models.tblReservation = require("./tblReservation/tblReservation")(sequelize, Sequelize.DataTypes);
db.models.tblOrder = require("./tblOrder/tblOrder")(sequelize, Sequelize.DataTypes);
db.models.tblCategory = require("./tblCategory/tblCategory")(sequelize, Sequelize.DataTypes);


module.exports = db;