module.exports = (sequelize, Sequelize) => {
    const Objetivos = sequelize.define("objetivos", {
      nombre: {
        type: Sequelize.TEXT,
        allowNull: false 
      },
      descripcion: {
        type: Sequelize.TEXT,
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