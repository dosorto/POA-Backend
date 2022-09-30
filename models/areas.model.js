const DataTypes = require('sequelize').DataTypes;
module.exports = (sequelize, Sequelize) => {
    const Areas = sequelize.define("areas", {
      
      nombre: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    });
    return Areas;
  };
 