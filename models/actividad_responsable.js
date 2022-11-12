module.exports = (sequelize, Sequelize) => {
    const actividad_responsable = sequelize.define("actividad_responsable", {
        idesponsable: {
            type: Sequelize.STRING,
  
        },
        idActividad: {
            type: Sequelize.STRING,
        }
    });
    return actividad_responsable;
  };