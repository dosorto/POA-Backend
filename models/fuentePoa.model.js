module.exports = (sequelize, Sequelize) => {
    const fuentePoa = sequelize.define("fuentePoa", {
      cantidad: {
        type: Sequelize.STRING,
        allowNull: false,
        isDelete: false
      }
    });
    return fuentePoa;
  };