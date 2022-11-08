module.exports = (sequelize, Sequelize) => {
    const objetogasto = sequelize.define("objetogasto", {
      nombre: {
        type: Sequelize.STRING,
        allowNull: false 
      },
     identificador: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  
    return objetogasto;
  };