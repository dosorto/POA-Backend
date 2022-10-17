module.exports = (sequelize, Sequelize) => {
    const Dimension = sequelize.define("dimension", {
      nombre: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  
    return Dimension;
  };