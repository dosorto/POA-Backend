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
db.institucion = require("./institucion.model.js")(sequelize, Sequelize);
db.area = require("./area.models.js")(sequelize, Sequelize);
db.resultado = require("./resultados.model.js")(sequelize, Sequelize);

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

/////// RELACIÓN DE UNO A MUCHOS /////////
//// UNA DIMENCION PERTENECE A UN PEI, UN PEI TIENE MUCHAS DIMENSIONES ////
db.pei.hasMany(db.dimension, {
  foreignKey: { name: 'idPei', allowNull: false }
});
db.dimension.belongsTo(db.pei, {
  foreignKey: { name: 'idPei', allowNull: false }
});

/////// RELACIÓN DE UNO A MUCHOS /////////
//// UN EMPLEADO PERTENECE A UNA INSTITUCION, UNA INSTITUCION TIENE MUCHOS EMPLEADOS ////
db.institucion.hasMany(db.empleado, {
  foreignKey: { name: 'idInstitucion', allowNull: false }
});
db.empleado.belongsTo(db.institucion, {
  foreignKey: { name: 'idInstitucion', allowNull: false }
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

db.role.hasMany(db.user, {
  foreignKey: { name: 'idRol', allowNull: false }
});
db.user.belongsTo(db.role, {
  foreignKey: { name: 'idRol', allowNull: false }
});

///////////////////////////////////////////
//////// RELACIÓN DE UNO A MUCHOS ////////
//// UN AREA TIENE UN OBJETIVO, UN OBJETIVO TIENE MUCHAS AREAS(1:N) ////
db.objetivos.hasMany(db.area, {
  foreignKey: { name: 'idObjetivos', allowNull: false }
});
db.area.belongsTo(db.objetivos, {
  foreignKey: { name: 'idObjetivos', allowNull: false}
});

///////////////////////////////////////////
//////// RELACIÓN DE UNO A MUCHOS ////////
//// UN AREA TIENE UNA DIMENSIÓN, UNA DIMENSIÓN TIENE MUCHAS AREAS(1:N) ////
db.dimension.hasMany(db.area, {
  foreignKey: { name: 'idDimension', allowNull: false }
});
db.area.belongsTo(db.dimension, {
  foreignKey: { name: 'idDimension', allowNull: false}
});

///////////////////////////////////////////
//////// RELACIÓN DE UNO A MUCHOS ////////
//// UN AREA TIENE UN PEI, UN PEI TIENE MUCHAS AREAS(1:N) ////
db.pei.hasMany(db.area, {
  foreignKey: { name: 'idPei', allowNull: false}
});
db.area.belongsTo(db.pei, {
  foreignKey: { name: 'idPei', allowNull: false}
});

///////////////////////////////////////////
//////// RELACIÓN DE UNO A MUCHOS ////////
//// UN RESULTADO TIENE UN AREA, UN AREA TIENE MUCHOS RESULTADOS(1:N) ////
db.area.hasMany(db.resultado, {
  foreignKey: { name: 'idArea', allowNull: false}
});
db.resultado.belongsTo(db.area, {
  foreignKey: { name: 'idArea', allowNull: false}
});

///////////////////////////////////////////
//////// RELACIÓN DE UNO A MUCHOS ////////
//// UN RESULTADO TIENE UN OBJETIVO, UN OBJETIVO TIENE MUCHOS RESULTADOS(1:N) ////
db.objetivos.hasMany(db.resultado, {
  foreignKey: { name: 'idObjetivos', allowNull: false}
});
db.resultado.belongsTo(db.objetivos, {
  foreignKey: { name: 'idObjetivos', allowNull: false}
});

///////////////////////////////////////////
//////// RELACIÓN DE UNO A MUCHOS ////////
//// UN RESULTADO TIENE UNA DIMENSIÓN, UNA DIMENSÓN TIENE MUCHOS RESULTADOS(1:N) ////
db.dimension.hasMany(db.resultado, {
  foreignKey: { name: 'idDimension', allowNull: false}
});
db.resultado.belongsTo(db.dimension, {
  foreignKey: { name: 'idDimension', allowNull: false}
});

///////////////////////////////////////////
//////// RELACIÓN DE UNO A MUCHOS ////////
//// UN RESULTADO TIENE UN PEI, UN PEI TIENE MUCHOS RESULTADOS(1:N) ////
db.pei.hasMany(db.resultado, {
  foreignKey: { name: 'idPei', allowNull: false}
});
db.resultado.belongsTo(db.pei, {
  foreignKey: { name: 'idPei', allowNull: false}
});

module.exports = db;