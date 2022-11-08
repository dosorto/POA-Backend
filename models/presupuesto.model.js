
module.exports = (sequelize, Sequelize) => {
    const presupuesto = sequelize.define("presupuesto", {
      um: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false 
      },
      costounitario: {
        type: Sequelize.INTEGER,
        allowNull: false 
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  
    return presupuesto;
  };