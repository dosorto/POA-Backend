module.exports = (sequelize, Sequelize) => {
    const POA = sequelize.define("poa", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      anio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      techopre: {
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
        defaultValue: false
      }
    });
  
    return POA;
  };