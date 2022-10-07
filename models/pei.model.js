module.exports = (sequelize, Sequelize) => {
    const PEI = sequelize.define("pei", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      initialYear: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      finalYear: {
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