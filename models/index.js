const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    operatorsAliases: 0
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./usuario.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.empleado = require("./empleado.model.js")(sequelize, Sequelize);
db.pei = require("./pei.model.js")(sequelize, Sequelize);
db.dimension = require("./dimension.model.js")(sequelize, Sequelize);
db.objetivos = require("./objetivos.model.js")(sequelize, Sequelize);
db.areas = require("./areas.model.js")(sequelize, Sequelize);
///////////////////////////////index.user.js//////////////////////////////
/////// RELACIÓN DE UNO A UNO /////////
//// UN USUARIO PERTENECE A UN EMPLEADO, UN EMPLEADO TIENE UN USUARIO ////
db.empleado.hasOne(db.user, {
  foreignKey: {
    name: 'idEmpleado', allowNull: false
  }
});
db.user.belongsTo(db.empleado, {
  foreignKey: {
    name: 'idEmpleado', allowNull: false
  }
});
////////////////////////////////////////////
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UN USUARIO TIENE UN ROL, UN ROL TIENE MUCHOS USUARIOS(1:N)////
db.role.hasMany(db.user, {
  foreignKey: { name: 'idRol', allowNull: false }
});
db.user.belongsTo(db.role, {
  foreignKey: { name: 'idRol', allowNull: false }
});
////////////////////////////////////////////
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UN USUARIO TIENE MUCHAS SESIONES, UN SESION TIENE UN USUARIOS(1:N)////
/*db.user.hasMany(db.sesion, {
  foreignKey: { name: 'idUsuario', allowNull: false }
});
db.sesion.belongsTo(db.user, {
  foreignKey: { name: 'idUsuario', allowNull: false }
});*/

////////////////////////////////////////////
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UNA DIMENSION TIENE UN PEI, UN PEI TIENE MUCHAS DIMENSIONES(1:N)////
db.pei.hasMany(db.dimension, {
  foreignKey: { name: 'idPei', allowNull: false }
});
db.dimension.belongsTo(db.pei, {
  foreignKey: { name: 'idPei', allowNull: false }
});

////////////////////////////////////////////
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UN Objetivo TIENE UNA DIMENSION, UNA DIMENSION TIENE MUCHOS OBJETIVOS(1:N)////
db.dimension.hasMany(db.objetivos, {
  foreignKey: { name: 'idDimension', allowNull: false }
});
db.objetivos.belongsTo(db.dimension, {
  foreignKey: { name: 'idDimension', allowNull: false }
});

////////////////////////////////////////////
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UN Objetivo TIENE UN PEI, UN PEI TIENE MUCHOS OBJETIVOS(1:N)////
db.pei.hasMany(db.objetivos, {
  foreignKey: { name: 'idPei', allowNull: false }
});
db.objetivos.belongsTo(db.pei, {
  foreignKey: { name: 'idPei', allowNull: false }
});

////////////////////////////////////////////
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UNA AREA TIENE UNA DIMENSION, UNA DIMENSION TIENE MUCHAS AREAS(1:N)////
db.dimension.hasMany(db.areas, {
  foreignKey: { name: 'idDimension', allowNull: false }
});
db.areas.belongsTo(db.dimension, {
  foreignKey: { name: 'idDimension', allowNull: false }
});

////////////////////////////////////////////
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UNa area TIENE UN PEI, UN PEI TIENE MUCHOS AREAS(1:N)////
db.pei.hasMany(db.areas, {
  foreignKey: { name: 'idPei', allowNull: false }
});

db.areas.belongsTo(db.pei, {
  foreignKey: { name: 'idPei', allowNull: false }
});

////////////////////////////////////////////
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UNa area TIENE UN PEI, UN PEI TIENE MUCHOS AREAS(1:N)////
db.objetivos.hasMany(db.areas, {
  foreignKey: { name: 'idObjetivo', allowNull: false }
});

db.areas.belongsTo(db.objetivos, {
  foreignKey: { name: 'idObjetivo', allowNull: false }
});
/*
db.role.hasMany(db.user, {
  foreignKey: { name: 'idRol', allowNull: false }
});
db.user.belongsTo(db.role, {
  foreignKey: { name: 'idRol', allowNull: false }
});
*/
module.exports = db;