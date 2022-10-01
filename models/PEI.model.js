module.exports = (sequelize, Sequelize) => {
    const PEI = sequelize.define("pei", {
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fechaInicio: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      fechaFin: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  
    return PEI;
  };