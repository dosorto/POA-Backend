module.exports = (sequelize, Sequelize) => {
    const Sesion = sequelize.define("Sesion", {
      token: {
        type: Sequelize.STRING,
        allowNull: false // no permite valores nulos
      },
      FechaInicio: {
        type: Sequelize.STRING,
        allowNull: false // no permite valores nulos
      },
      FechaFin: {
        type: Sequelize.STRING,
        allowNull: false // no permite valores nulos 
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false, // no permite valores nulos
        defaultValue: false // establece el valor por defecto en false
      }
    });
    return Sesion;
  };