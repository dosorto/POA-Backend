module.exports = (sequelize, Sequelize) => {
    const Objetivos = sequelize.define("objetivos", {
      nombre: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  
    return Objetivos;
  };