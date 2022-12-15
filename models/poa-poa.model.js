module.exports = (sequelize, Sequelize) => {
    const POA = sequelize.define("poa", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      anio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fuente11: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fuente12: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fuente12B: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    });
  
    return POA;
  };