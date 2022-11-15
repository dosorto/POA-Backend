module.exports = (sequelize, Sequelize) => {
    const unidadmedida = sequelize.define("unidadmedida", {
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
  
    return unidadmedida;
  };