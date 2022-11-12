const DataTypes = require('sequelize').DataTypes;
module.exports = (sequelize, Sequelize) => {
    const Actividades = sequelize.define("actividades", {
nombre:{
    type: Sequelize.TEXT,
    allowNull: false,
},


descripcion:{
    type:Sequelize.TEXT,
    allowNull:false,
},



resultadoUnidad:{
    type:Sequelize.TEXT,
    allowNull:false,
},


estado:{
    type:Sequelize.ENUM('FORMULACION','REFORMULACION','REVISION','APROBADO','RECHAZADO',),
    allowNull:false,
},


tipoActividad:{
    type:Sequelize.ENUM('ACADEMICA','ADMINISTRATIVA'),
    allowNull:false,
},

categoria:{
    type:Sequelize.ENUM('COORDINACION','JEFATURA'),
    allowNull:false,
},

isActive:{
    type:Sequelize.BOOLEAN,
    allowNull:false,
    defaultValue:false
},
});
return Actividades;
};
